import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, Jwt, LiteralObject, Operator, Utils } from '@aurorajs.dev/core';
import { Sequelize } from 'sequelize-typescript';

// @app
import { IamCreateAccountCommand, IamFindAccountByIdQuery } from '@app/iam/account';
import { IamAccount, IamAccountType, IamCreateAccountInput } from '@api/graphql';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// ---- customizations ----
import { JwtService } from '@nestjs/jwt';
import { IamGetRolesQuery } from '@app/iam/role';
import { IamGetAccountsQuery } from '@app/iam/account';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { OAuthFindAccessTokenByIdQuery } from '@app/o-auth/access-token';
import { IamCreateUserCommand, IamGetUsersQuery } from '@app/iam/user';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';

@Injectable()
export class IamCreateAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
        private readonly sequelize: Sequelize,
        private readonly createPermissionsFromRolesService: IamCreatePermissionsFromRolesService,
    ) {}

    async main(
        payload: IamCreateAccountInput | IamCreateAccountDto,
        headers: LiteralObject,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        const clients = await this.queryBus.ask(new IamGetAccountsQuery(
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

        if (clients.length > 0)
        {
            if (clients.some(client => client.email === payload.email))
            {
                throw new ConflictException({
                    message   : `The email ${payload.code} already exists`,
                    statusCode: 102,
                });
            }

            if (clients.some(client => client.code === payload.code))
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

        // get access token from database
        const accessToken = await this.queryBus.ask(new OAuthFindAccessTokenByIdQuery(jwt.jit));

        // get client to get applications related FindClientByIdQuery
        const client = await this.queryBus.ask(new OAuthFindClientByIdQuery(
            payload.type === IamAccountType.SERVICE ? payload.clientId : accessToken.clientId,
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

        const transaction = await this.sequelize.transaction({
            logging: message => Logger.log(message, [
                'IamCreateAccountHandler',
                `IamAccount.id: ${payload.id}`,
            ]),
        });

        try
        {
            const operationId = Utils.uuid();

            await this.commandBus.dispatch(new IamCreateAccountCommand(
                {
                    id               : payload.id,
                    type             : payload.type,
                    code             : payload.code,
                    email            : payload.email,
                    isActive         : payload.isActive,
                    clientId         : client?.id,
                    scopes           : payload.scopes,
                    dApplicationCodes: client?.applications.map(application => application.code),
                    dPermissions     : this.createPermissionsFromRolesService.main(roles),
                    meta             : payload.meta,
                    roleIds          : payload.roleIds,
                    tenantIds        : payload.tenantIds,
                },
                {
                    timezone,
                    repositoryOptions: {
                        transaction,
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
                            transaction,
                            auditing: {
                                ...auditing,
                                operationId,
                                operationSort: 2,
                            },
                        },
                    },
                ));
            }

            await transaction.commit();
        }
        catch (error)
        {
            await transaction.rollback();
            throw error;
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
