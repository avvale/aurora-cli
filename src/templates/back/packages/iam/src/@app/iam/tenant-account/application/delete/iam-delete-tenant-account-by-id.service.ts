import { IamITenantAccountRepository } from '@app/iam/tenant-account';
import { IamTenantAccountAccountId, IamTenantAccountTenantId } from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTenantAccountByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantAccountRepository,
    ) {}

    async main(
        tenantId: IamTenantAccountTenantId,
        accountId: IamTenantAccountAccountId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const tenantAccount = await this.repository
            .findById(
                undefined,
                {
                    constraint,
                    cQMetadata,
                    findArguments: {
                        tenantId: tenantId.value,
                        accountId: accountId.value,
                    },
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                undefined,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                    findArguments: {
                        tenantId: tenantAccount.tenantId.value,
                        accountId: tenantAccount.accountId.value,
                    },
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const tenantAccountRegister = this.publisher.mergeObjectContext(tenantAccount);

        tenantAccountRegister.deleted({
            payload: tenantAccount,
            cQMetadata,
        }); // apply event to model events
        tenantAccountRegister.commit(); // commit all events of model
    }
}
