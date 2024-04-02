import { IamAccount, IamAccountType, IamCreateAccountInput } from '@api/graphql';
import { IamAccountDto, IamCreateAccountDto } from '@api/iam/account';
import { IamCreateAccountCommand, IamFindAccountByIdQuery, IamGetAccountsQuery } from '@app/iam/account';
import { IamGetRolesQuery } from '@app/iam/role';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { IamGetTenantsQuery } from '@app/iam/tenant';
import { IamCreateUserCommand, IamGetUsersQuery } from '@app/iam/user';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus, IQueryBus, Jwt, LiteralObject, Operator, Utils, getNestedObjectsFromParentId } from '@aurorajs.dev/core';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IamCreateAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: IamCreateAccountInput | IamCreateAccountDto,
        headers: LiteralObject,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        const accounts = await this.queryBus.ask(new IamGetAccountsQuery(
            {
                where: {
                    [Operator.or]: payload.code ?
                        {
                            code : payload.code,
                            email: payload.email,
                        } :
                        {
                            email: payload.email,
                        }
                    ,
                },
            },
        ));

        if (accounts.length > 0)
        {
            if (accounts.some(client => client.email === payload.email))
            {
                throw new ConflictException({
                    message   : `The email ${payload.email} already exists`,
                    statusCode: 102,
                });
            }

            if (accounts.some(client => client.code === payload.code))
            {
                throw new ConflictException({
                    message   : `The code ${payload.code} already exists`,
                    statusCode: 103,
                });
            }

            throw new ConflictException({});
        }

        if (payload.type === IamAccountType.USER)
        {
            const users = await this.queryBus.ask(new IamGetUsersQuery(
                {
                    where: {
                        username: payload.user.username,
                    },
                },
            ));

            if (users.length > 0) throw new ConflictException({
                message   : `The username ${payload.user.username} already exists in the database`,
                statusCode: 101,
            });
        }

        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(headers.authorization.replace('Bearer ', ''));

        // get client to get applications related FindClientByIdQuery
        const client = await this.queryBus.ask(new OAuthFindClientByIdQuery(
            payload.clientId,
            {
                include: [
                    {
                        association: 'applications',
                    },
                ],
            },
        ));

        // get roles
        const roles = await this.queryBus.ask(new IamGetRolesQuery({
            where: {
                id: payload.roleIds,
            },
            include: [
                {
                    association: 'permissions',
                },
            ],
        }));


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
            payload.tenantIds = [...accountTenantIds];
        }

        const operationId = Utils.uuid();

        await this.commandBus.dispatch(new IamCreateAccountCommand(
            {
                id               : payload.id,
                type             : payload.type,
                code             : payload.code,
                email            : payload.email,
                isActive         : payload.isActive,
                clientId         : client?.id,
                tags             : payload.tags,
                scopes           : payload.scopes,
                dApplicationCodes: client?.applications.map(application => application.code),
                dPermissions     : iamCreatePermissionsFromRoles(roles),
                meta             : payload.meta,
                roleIds          : payload.roleIds,
                tenantIds        : payload.tenantIds,
            },
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

        if (payload.type === IamAccountType.USER)
        {
            await this.commandBus.dispatch(new IamCreateUserCommand(
                {
                    id           : Utils.uuid(),
                    accountId    : payload.id,
                    name         : payload.user.name,
                    surname      : payload.user.surname,
                    avatar       : payload.user.avatar,
                    mobile       : payload.user.mobile,
                    langId       : payload.user.langId,
                    username     : payload.user.username,
                    password     : payload.user.password,
                    rememberToken: payload.user.rememberToken,
                    meta         : null,
                },
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
            {},
            {
                timezone,
            },
        ));
    }
}
