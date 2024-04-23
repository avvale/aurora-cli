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
    IamAccountUsername,
} from '@app/iam/account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        payload: {
            id?: IamAccountId;
            type?: IamAccountType;
            code?: IamAccountCode;
            email?: IamAccountEmail;
            username?: IamAccountUsername;
            isActive?: IamAccountIsActive;
            clientId?: IamAccountClientId;
            tags?: IamAccountTags;
            scopes?: IamAccountScopes;
            dApplicationCodes?: IamAccountDApplicationCodes;
            dPermissions?: IamAccountDPermissions;
            dTenants?: IamAccountDTenants;
            meta?: IamAccountMeta;
            roleIds?: IamAccountRoleIds;
            tenantIds?: IamAccountTenantIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const account = IamAccount.register(
            payload.id,
            payload.type,
            payload.code,
            payload.email,
            payload.username,
            payload.isActive,
            payload.clientId,
            payload.tags,
            payload.scopes,
            payload.dApplicationCodes,
            payload.dPermissions,
            payload.dTenants,
            payload.meta,
            payload.roleIds,
            payload.tenantIds,
            null, // createdAt
            new IamAccountUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            account,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const accounts = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountsRegister = this.publisher.mergeObjectContext(
            new IamAddAccountsContextEvent(accounts),
        );

        accountsRegister.updated(); // apply event to model events
        accountsRegister.commit(); // commit all events of model
    }
}
