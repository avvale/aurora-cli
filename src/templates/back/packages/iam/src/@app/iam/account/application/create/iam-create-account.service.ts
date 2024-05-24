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
    IamAccountTags,
    IamAccountTenantIds,
    IamAccountType,
    IamAccountUpdatedAt,
    IamAccountUsername,
} from '@app/iam/account/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateAccountService
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
            username: IamAccountUsername;
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
        },
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
            new IamAccountCreatedAt({ currentTimestamp: true }),
            new IamAccountUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            account,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account,
        );

        accountRegister.created({
            payload: account,
            cQMetadata,
        }); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}
