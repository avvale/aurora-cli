import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from '../../domain/value-objects';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamAccount } from '../../domain/iam-account.aggregate';
import { IamAddAccountsContextEvent } from '../events/iam-add-accounts-context.event';

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
            isActive?: IamAccountIsActive;
            clientId?: IamAccountClientId;
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
            payload.isActive,
            payload.clientId,
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
