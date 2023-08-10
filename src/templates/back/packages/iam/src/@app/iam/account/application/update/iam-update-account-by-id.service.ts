import { IamAccount, IamIAccountRepository } from '@app/iam/account';
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
    IamAccountTenantIds,
    IamAccountType,
    IamAccountUpdatedAt,
} from '@app/iam/account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAccountByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        payload: {
            id: IamAccountId;
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

        // update by id
        await this.repository.updateById(
            account,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account,
        );

        accountRegister.updated(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}
