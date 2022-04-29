import { Injectable, LiteralObject } from '@nestjs/common';
import { ICommandBus, IQueryBus, Jwt, OAuthFindAccessTokenByIdQuery, OAuthFindClientByIdQuery, Utils } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '../../../../@apps/iam/account/application/create/create-account.command';
import { IamAccount, IamAccountType, IamCreateAccountInput } from '../../../../graphql';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// ---- customizations ----
import { JwtService } from '@nestjs/jwt';
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { CreateUserCommand } from '../../../../@apps/iam/user/application/create/create-user.command';
import { AccountHelper } from '../../../../@apps/iam/account/domain/account.helper';

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
        const accessToken = await this.queryBus.ask(new OAuthFindAccessTokenByIdQuery(jwt.jit));

        // get client to get applications related OAuthFindClientByIdQuery
        const client = await this.queryBus.ask(new OAuthFindClientByIdQuery(payload.type === IamAccountType.SERVICE ? payload.clientId : accessToken.clientId,
            {
                include: ['applications'],
            },
        ));

        // get roles
        const roles = await this.queryBus.ask(new GetRolesQuery({
            where: {
                id: payload.roleIds,
            },
            include: ['permissions'],
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