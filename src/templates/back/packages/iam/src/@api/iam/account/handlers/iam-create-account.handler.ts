import { Injectable, LiteralObject } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, Jwt, Utils } from '@aurora-ts/core';
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
            // logging: console.log,  // Just for debugging purposes
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