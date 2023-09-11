import { IamITenantAccountRepository, IamTenantAccount } from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateTenantAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantAccountRepository,
    ) {}

    async main(
        payload: {
            tenantId: IamTenantAccountTenantId;
            accountId: IamTenantAccountAccountId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenantAccount = IamTenantAccount.register(
            payload.tenantId,
            payload.accountId,
        );

        await this.repository.create(
            tenantAccount,
            {
                createOptions: cQMetadata?.repositoryOptions,
                finderQueryStatement: (aggregate: IamTenantAccount) => ({
                    where: {
                        tenantId: aggregate['tenantId']['value'],
                        accountId: aggregate['accountId']['value'],
                    },
                }),
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantAccountRegister = this.publisher.mergeObjectContext(
            tenantAccount,
        );

        tenantAccountRegister.created(tenantAccount); // apply event to model events
        tenantAccountRegister.commit(); // commit all events of model
    }
}
