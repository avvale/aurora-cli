import { IamITenantAccountRepository, IamTenantAccount } from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateTenantAccountByIdService
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
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenantAccount = IamTenantAccount.register(
            payload.tenantId,
            payload.accountId,
        );

        // update by id
        await this.repository.updateById(
            tenantAccount,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantAccountRegister = this.publisher.mergeObjectContext(
            tenantAccount,
        );

        tenantAccountRegister.updated(tenantAccount); // apply event to model events
        tenantAccountRegister.commit(); // commit all events of model
    }
}
