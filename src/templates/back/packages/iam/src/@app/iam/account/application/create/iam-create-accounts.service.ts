import { IamAccount, IamAddAccountsContextEvent, IamIAccountRepository } from '@app/iam/account';
import {
    IamAccountClientId,
    IamAccountCode,
    IamAccountCreatedAt,
    IamAccountDApplicationCodes,
    IamAccountDeletedAt,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountEmail,
    IamAccountId,
    IamAccountIsActive,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountScopes,
    IamAccountTags,
    IamAccountTenantIds,
    IamAccountType,
    IamAccountUpdatedAt,
} from '@app/iam/account/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        payload: {
            id: IamAccountId;
            type: IamAccountType;
            code: IamAccountCode;
            email: IamAccountEmail;
            isActive: IamAccountIsActive;
            clientId: IamAccountClientId;
            tags: IamAccountTags;
            scopes: IamAccountScopes;
            dApplicationCodes: IamAccountDApplicationCodes;
            dPermissions: IamAccountDPermissions;
            dTenants: IamAccountDTenants;
            meta: IamAccountMeta;
            roleIds: IamAccountRoleIds;
            tenantIds: IamAccountTenantIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAccounts = payload.map(account => IamAccount.register(
            account.id,
            account.type,
            account.code,
            account.email,
            account.isActive,
            account.clientId,
            account.tags,
            account.scopes,
            account.dApplicationCodes,
            account.dPermissions,
            account.dTenants,
            account.meta,
            account.roleIds,
            account.tenantIds,
            new IamAccountCreatedAt({ currentTimestamp: true }),
            new IamAccountUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAccounts,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accountsRegistered = this.publisher.mergeObjectContext(new IamAddAccountsContextEvent(aggregateAccounts));

        accountsRegistered.created(); // apply event to model events
        accountsRegistered.commit(); // commit all events of model
    }
}
