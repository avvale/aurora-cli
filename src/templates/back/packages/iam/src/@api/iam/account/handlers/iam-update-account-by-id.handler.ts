import { IamAccount, IamAccountType, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '@api/iam/account';
import { IamAccountResponse, IamFindAccountByIdQuery, IamUpdateAccountByIdCommand } from '@app/iam/account';
import { IamPermissions } from '@app/iam/iam.types';
import { IamGetRolesQuery } from '@app/iam/role';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { IamGetTenantsQuery } from '@app/iam/tenant';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { Arr, AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff, getNestedObjectsFromParentId, uuid } from '@aurorajs.dev/core';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: IamUpdateAccountByIdInput | IamUpdateAccountByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        const accountToUpdate = await this.queryBus.ask(new IamFindAccountByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, accountToUpdate);

        // always delete dPermissions to avoid update it
        delete dataToUpdate.dPermissions;

        if ('tags' in dataToUpdate)
        {
            dataToUpdate['tags'] = payload.tags;
        }

        if ('scopes' in dataToUpdate)
        {
            dataToUpdate['scopes'] = payload.scopes;
        }

        if ('roleIds' in dataToUpdate)
        {
            // get roles with permissions
            const roles = await this.queryBus.ask(new IamGetRolesQuery({
                where: {
                    id: payload.roleIds,
                },
                include: ['permissions'],
            }));

            const permissions = iamCreatePermissionsFromRoles(roles);

            if (
                !account.dPermissions.all.includes(IamPermissions.SUDO) &&
                !Arr.contained(permissions.all, account.dPermissions.all)
            )
            {
                throw new ConflictException({
                    message    : 'The account does not have the required permissions to update the account with the specified roles.',
                    statusCode : 401,
                    translation: 'error.106',
                });
            }

            dataToUpdate['dPermissions'] = permissions;
        }

        // if hasAddChildTenants, we need to get all children tenants, even if tenants doesn't changed
        if (payload.hasAddChildTenants)
        {
            // get all tenants to get children tenants
            const tenants = await this.queryBus.ask(new IamGetTenantsQuery());
            const accountTenantIds = new Set<string>();

            for (const tenantId of payload.tenantIds)
            {
                // add parent tenantId
                accountTenantIds.add(tenantId);

                for (const tenant of getNestedObjectsFromParentId(tenants, tenantId))
                {
                    accountTenantIds.add(tenant.id);
                }
            }

            // add all children tenant ids
            dataToUpdate['tenantIds'] = [...accountTenantIds];
        }
        else
        {
            // to update avoid array diff, we need to set the tenantIds from payload
            if ('tenantIds' in dataToUpdate) dataToUpdate['tenantIds'] = payload.tenantIds;
        }

        const operationId = uuid();

        await this.commandBus.dispatch(new IamUpdateAccountByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing: {
                        ...auditing,
                        operationId,
                        operationSort: 1,
                    },
                },
            },
        ));

        if (accountToUpdate.type === IamAccountType.USER)
        {
            const user = await this.queryBus.ask(new IamFindUserByIdQuery(
                payload.user.id,
                constraint,
                {
                    timezone,
                },
            ));

            const dataToUpdate = diff(payload.user, user);

            // always password will be empty unless is changed
            if (dataToUpdate.password === '') delete dataToUpdate.password;

            await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.user.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing: {
                            ...auditing,
                            operationId,
                            operationSort: 2,
                        },
                    },
                },
            ));
        }

        return await this.queryBus.ask(new IamFindAccountByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
