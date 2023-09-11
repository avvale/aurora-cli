import { IamAddTenantsAccountsContextEvent, IamITenantAccountRepository, IamTenantAccount } from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateTenantsAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantAccountRepository,
    ) {}

    async main(
        payload: {
            tenantId: IamTenantAccountTenantId;
            accountId: IamTenantAccountAccountId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateTenantsAccounts = payload.map(tenantAccount => IamTenantAccount.register(
            tenantAccount.tenantId,
            tenantAccount.accountId,
        ));

        // insert
        await this.repository.insert(
            aggregateTenantsAccounts,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddTenantsAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsAccountsRegistered = this.publisher.mergeObjectContext(new IamAddTenantsAccountsContextEvent(aggregateTenantsAccounts));

        tenantsAccountsRegistered.created(); // apply event to model events
        tenantsAccountsRegistered.commit(); // commit all events of model
    }
}
