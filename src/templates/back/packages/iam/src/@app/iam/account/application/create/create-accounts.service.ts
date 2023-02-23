import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    AccountId,
    AccountType,
    AccountCode,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountScopes,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountMeta,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../domain/value-objects';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';
import { AddAccountsContextEvent } from '../events/add-accounts-context.event';

@Injectable()
export class CreateAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    async main(
        accounts: {
            id: AccountId;
            type: AccountType;
            code: AccountCode;
            email: AccountEmail;
            isActive: AccountIsActive;
            clientId: AccountClientId;
            scopes: AccountScopes;
            dApplicationCodes: AccountDApplicationCodes;
            dPermissions: AccountDPermissions;
            dTenants: AccountDTenants;
            meta: AccountMeta;
            roleIds: AccountRoleIds;
            tenantIds: AccountTenantIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAccounts = accounts.map(account => IamAccount.register(
            account.id,
            account.type,
            account.code,
            account.email,
            account.isActive,
            account.clientId,
            account.scopes,
            account.dApplicationCodes,
            account.dPermissions,
            account.dTenants,
            account.meta,
            account.roleIds,
            account.tenantIds,
            new AccountCreatedAt({ currentTimestamp: true }),
            new AccountUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateAccounts, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accountsRegistered = this.publisher.mergeObjectContext(new AddAccountsContextEvent(aggregateAccounts));

        accountsRegistered.created(); // apply event to model events
        accountsRegistered.commit(); // commit all events of model
    }
}