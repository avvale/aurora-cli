import { IamAccount, IamAccountType, IamCreateAccountInput } from '@api/graphql';
import { IamAccountDto, IamCreateAccountDto } from '@api/iam/account';
import { IamAccountResponse, IamCreateAccountCommand, IamFindAccountByIdQuery, IamGetAccountsQuery } from '@app/iam/account';
import { IamPermissions } from '@app/iam/iam.types';
import { IamGetRolesQuery } from '@app/iam/role';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { IamGetTenantsQuery } from '@app/iam/tenant';
import { IamCreateUserCommand } from '@app/iam/user';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { Arrays, AuditingMeta, getNestedObjectsFromParentId, ICommandBus, IQueryBus, LiteralObject, Operator, uuid } from '@aurorajs.dev/core';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export const createAccount = async (
    {
        moduleRef = null,
        payload = null,
        account = null,
        headers = null,
        timezone = null,
        auditing = null,
    }: {
        moduleRef?: ModuleRef;
        payload?: IamCreateAccountInput | IamCreateAccountDto;
        account?: IamAccountResponse;
        headers?: LiteralObject;
        timezone?: string;
        auditing?: AuditingMeta;
    } = {},
): Promise<IamAccount | IamAccountDto> =>
{
    if (!moduleRef) throw new BadRequestException('moduleRef parameter is required');
    if (!payload) throw new BadRequestException('payload parameter is required');

    const queryBus = moduleRef.get(IQueryBus, { strict: false });
    const commandBus = moduleRef.get(ICommandBus, { strict: false });
    const jwtService = moduleRef.get(JwtService, { strict: false });

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
                message    : `The email ${payload.email} already exists`,
                translation: 'error.102',
            });
        }

        if (accounts.some(client => client.code === payload.code))
        {
            throw new ConflictException({
                message    : `The code ${payload.code} already exists`,
                translation: 'error.103',
            });
        }

        if (accounts.some(client => client.username === payload.username))
        {
            throw new ConflictException({
                message    : `The username ${payload.username} already exists in the database`,
                translation: 'error.101',
            });
        }
    }

    // check token is correct
    jwtService.decode(headers.authorization.replace('Bearer ', ''));

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

    const permissions = iamCreatePermissionsFromRoles(roles);

    if (
        !account.dPermissions.includes(IamPermissions.SUDO) &&
        !Arrays.contained(permissions.all, account.dPermissions.all)
    )
    {
        throw new ConflictException({
            message    : 'Your account does not have the required permissions to create an account with the specified roles.',
            statusCode : 401,
            translation: 'error.105',
        });
    }

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
            dPermissions     : permissions,
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