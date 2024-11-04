import { IamAccount, IamAccountType, IamCreateAccountInput } from '@api/graphql';
import { IamAccountDto, IamCreateAccountDto } from '@api/iam/account';
import { IamCreateAccountCommand, IamFindAccountByIdQuery, IamGetAccountsQuery } from '@app/iam/account';
import { IamGetRolesQuery } from '@app/iam/role';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { IamGetTenantsQuery } from '@app/iam/tenant';
import { IamCreateUserCommand } from '@app/iam/user';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { AuditingMeta, getNestedObjectsFromParentId, ICommandBus, IQueryBus, Jwt, LiteralObject, Operator, uuid } from '@aurorajs.dev/core';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const createAccount = async (
    commandBus: ICommandBus,
    queryBus: IQueryBus,
    jwtService: JwtService,
    payload: IamCreateAccountInput | IamCreateAccountDto,
    headers: LiteralObject,
    timezone?: string,
    auditing?: AuditingMeta,
): Promise<IamAccount | IamAccountDto> =>
{
    const accountQueryWhere = { username: payload.username };
    if (payload.code) accountQueryWhere['code'] = payload.code;
    if (payload.email) accountQueryWhere['email'] = payload.email;

    const accounts = await queryBus.ask(new IamGetAccountsQuery(
        {
            where: {
                [Operator.or]: accountQueryWhere,
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

        if (accounts.some(client => client.username === payload.username))
        {
            throw new ConflictException({
                message   : `The username ${payload.username} already exists in the database`,
                statusCode: 101,
            });
        }
    }

    // check token is correct
    <Jwt>jwtService.decode(headers.authorization.replace('Bearer ', ''));

    // get client to get applications related FindClientByIdQuery
    const client = await queryBus.ask(new OAuthFindClientByIdQuery(
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
    const roles = await queryBus.ask(new IamGetRolesQuery({
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
        const tenants = await queryBus.ask(new IamGetTenantsQuery());
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

    const operationId = uuid();

    await commandBus.dispatch(new IamCreateAccountCommand(
        {
            id               : payload.id,
            type             : payload.type,
            code             : payload.code,
            email            : payload.email,
            username         : payload.username,
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
        await commandBus.dispatch(new IamCreateUserCommand(
            {
                id                              : uuid(),
                accountId                       : payload.id,
                name                            : payload.user.name,
                surname                         : payload.user.surname,
                avatar                          : payload.user.avatar,
                mobile                          : payload.user.mobile,
                langId                          : payload.user.langId,
                password                        : payload.user.password,
                isTwoFactorAuthenticationEnabled: false,
                rememberToken                   : payload.user.rememberToken,
                meta                            : null,
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

    return await queryBus.ask(new IamFindAccountByIdQuery(
        payload.id,
        {},
        {
            timezone,
        },
    ));

};