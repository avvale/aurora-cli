import { IamAddTenantsAccountsContextEvent, IamITenantAccountRepository, IamTenantAccount } from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAndIncrementTenantsAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantAccountRepository,
    ) {}

    async main(
        payload: {
            tenantId?: IamTenantAccountTenantId;
            accountId?: IamTenantAccountAccountId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenantAccount = IamTenantAccount.register(
            payload.tenantId,
            payload.accountId,
        );

        // update and increment
        await this.repository.updateAndIncrement(
            tenantAccount,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const tenantsAccounts = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantsAccountsRegister = this.publisher.mergeObjectContext(
            new IamAddTenantsAccountsContextEvent(tenantsAccounts),
        );

        tenantsAccountsRegister.updatedAndIncremented(); // apply event to model events
        tenantsAccountsRegister.commit(); // commit all events of model
    }
}
