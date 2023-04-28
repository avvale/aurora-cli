import { ConflictException, Injectable, LiteralObject, Logger } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, Jwt, Operator, Utils } from '@aurora-ts/core';
import { Sequelize } from 'sequelize-typescript';

// @app
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '@app/iam/account/application/create/create-account.command';
import { IamAccount, IamAccountType, IamCreateAccountInput } from '@api/graphql';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// ---- customizations ----
import { JwtService } from '@nestjs/jwt';
import { GetRolesQuery } from '@app/iam/role/application/get/get-roles.query';
import { FindClientByIdQuery } from '@app/o-auth/client/application/find/find-client-by-id.query';
import { FindAccessTokenByIdQuery } from '@app/o-auth/access-token/application/find/find-access-token-by-id.query';
import { CreateUserCommand } from '@app/iam/user/application/create/create-user.command';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';
import { GetAccountsQuery } from '@app/iam/account/application/get/get-accounts.query';
import { GetUsersQuery } from '@app/iam/user/application/get/get-users.query';

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
        const clients = await this.queryBus.ask(new GetAccountsQuery(
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
            const users = await this.queryBus.ask(new GetUsersQuery(
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
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwt.jit));

        // get client to get applications related FindClientByIdQuery
        const client = await this.queryBus.ask(new FindClientByIdQuery(
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
        const roles = await this.queryBus.ask(new GetRolesQuery({
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

            await this.commandBus.dispatch(new CreateAccountCommand(
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
                await this.commandBus.dispatch(new CreateUserCommand(
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

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}