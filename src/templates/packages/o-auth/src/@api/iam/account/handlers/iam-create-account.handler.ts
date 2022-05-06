import { Injectable, LiteralObject } from '@nestjs/common';
import { ICommandBus, IQueryBus, Jwt, Utils } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '@apps/iam/account/application/create/create-account.command';
import { IamAccount, IamAccountType, IamCreateAccountInput } from '../../../../graphql';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// ---- customizations ----
import { JwtService } from '@nestjs/jwt';
import { GetRolesQuery } from '@apps/iam/role/application/get/get-roles.query';
import { FindClientByIdQuery } from '@apps/o-auth/client/application/find/find-client-by-id.query';
import { FindAccessTokenByIdQuery } from '@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { CreateUserCommand } from '@apps/iam/user/application/create/create-user.command';
import { AccountHelper } from '@apps/iam/account/domain/account.helper';
import { OAuthApplicationModel } from '@apps/o-auth/application/infrastructure/sequelize/sequelize-application.model';
import { IamPermissionModel } from '@apps/iam/permission/infrastructure/sequelize/sequelize-permission.model';

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
    ): Promise<IamAccount | IamAccountDto>
    {
        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(headers.authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwt.jit));

        // get client to get applications related FindClientByIdQuery
        const client = await this.queryBus.ask(new FindClientByIdQuery(payload.type === IamAccountType.SERVICE ? payload.clientId : accessToken.clientId,
            {
                include: [
                    {
                        model: OAuthApplicationModel,
                        as   : 'applications',
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
                    model: IamPermissionModel,
                    as   : 'permissions',
                },
            ],
        }));

        await this.commandBus.dispatch(new CreateAccountCommand(
            {
                id               : payload.id,
                type             : payload.type,
                email            : payload.email,
                isActive         : payload.isActive,
                clientId         : client?.id,
                dApplicationCodes: client?.applications.map(application => application.code),
                dPermissions     : AccountHelper.createPermissions(roles),
                dScopes          : client?.scopes,
                data             : payload.data,
                roleIds          : payload.roleIds,
                tenantIds        : payload.tenantIds,
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
                    data         : payload.user.data,
                }, { timezone },
            ));
        }

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}