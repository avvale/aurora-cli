import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ICommandBus, IQueryBus, Jwt, Utils } from 'aurora-ts-core';

// @apps
import { FindClientQuery } from '@apps/o-auth/client/application/find/find-client.query';
import { CreateAccessTokenCommand } from '@apps/o-auth/access-token/application/create/create-access-token.command';
import { CreateRefreshTokenCommand } from '@apps/o-auth/refresh-token/application/create/create-refresh-token.command';
import { FindAccessTokenQuery } from '@apps/o-auth/access-token/application/find/find-access-token.query';
import { FindAccountQuery } from '@apps/iam/account/application/find/find-account.query';
import { OAuthRefreshTokenModel } from '@apps/o-auth/refresh-token/infrastructure/sequelize/sequelize-refresh-token.model';
import { FindUserByUsernamePasswordQuery } from '@apps/iam/user/application/find/find-user-by-username-password.query';
import { FindApplicationByAuthorizationHeaderQuery } from '@apps/o-auth/application/application/find/find-application-by-authorization-header.query';
import { FindRefreshTokenByIdQuery } from '@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteAccessTokenByIdCommand } from '@apps/o-auth/access-token/application/delete/delete-access-token-by-id.command';
import { OAuthAccessTokenModel } from '@apps/o-auth/access-token';
import { OAuthClientModel } from '@apps/o-auth/client';
import { OAuthClientGrantType, OAuthCredentials, OAuthCreateCredentialsInput, IamAccountType, OAuthClient } from '../../../../graphql';
import { OAuthCreateCredentialsDto, OAuthCredentialsDto } from '../dto';

@Injectable()
export class OAuthCreateCredentialsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: OAuthCreateCredentialsInput | OAuthCreateCredentialsDto,
        authorization: string,
    ): Promise<OAuthCredentials | OAuthCredentialsDto>
    {
        if (!payload.grantType) throw new BadRequestException('Value for grantType property must be defined, can not be undefined');

        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {
            /**/
        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS)
        {
            // get account with email
            const account = await this.queryBus.ask(new FindAccountQuery({
                where: {
                    email   : payload.email,
                    type    : IamAccountType.SERVICE,
                    isActive: true,
                },
            }));

            // if not exist user throw error
            if (!account) throw new UnauthorizedException();

            // get client
            const client = await this.queryBus.ask(new FindClientQuery({
                where: {
                    id       : account.clientId,
                    secret   : payload.clientSecret,
                    grantType: OAuthClientGrantType.CLIENT_CREDENTIALS,
                },
            }));

            // if not exist client throw error
            if (!client) throw new UnauthorizedException();

            return await this.createCredential(client, account.id);
        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD)
        {
            // get user with username and password
            const user = await this.queryBus.ask(new FindUserByUsernamePasswordQuery(payload.username, payload.password));

            // if not exist user throw error
            if (!user) throw new UnauthorizedException();

            // get application and clients with header authorization basic authentication
            const application = await this.queryBus.ask(new FindApplicationByAuthorizationHeaderQuery(authorization));

            // if not exist application throw error
            if (!application) throw new UnauthorizedException();

            // TODO, como determinar a que cliente se autentifica?? a traves del clientId que contiene el usuario, por lo que tiene que coindir
            // la aplicación recuperada a través del authorization y el client que tiene la aplicación
            // get client associated with this application
            const client = application.clients.find(client => client.id === user.account.clientId);

            // if not exist client throw error
            if (!client) throw new UnauthorizedException();

            // create a JWT access tToken
            return await this.createCredential(client, user.accountId);
        }

        if (payload.grantType === OAuthClientGrantType.REFRESH_TOKEN)
        {
            // get refresh token session
            const refreshTokenSession = <Jwt>this.jwtService.decode(payload.refreshToken);

            // get refresh token aggregate
            const refreshTokenAggregate = await this.queryBus.ask(new FindRefreshTokenByIdQuery(refreshTokenSession.jit, {
                include: [
                    {
                        model  : OAuthAccessTokenModel,
                        as     : 'accessToken',
                        include: [
                            {
                                model: OAuthClientModel,
                                as   : 'client',
                            },
                        ],
                    },
                ],
            }));

            // check that refresh token isn't expired
            if (refreshTokenSession.exp < parseInt(Utils.now().format('X'))) throw new UnauthorizedException();

            // delete access token from database
            await this.commandBus.dispatch(new DeleteAccessTokenByIdCommand(refreshTokenAggregate.accessTokenId));

            return await this.createCredential(refreshTokenAggregate.accessToken.client, refreshTokenAggregate.accessToken.accountId);
        }
    }

    private async createCredential(client: OAuthClient, accountId: string): Promise<OAuthCredentials | OAuthCredentialsDto>
    {
        // create a JWT access tToken
        const accessTokenId = Utils.uuid();
        await this.commandBus.dispatch(new CreateAccessTokenCommand(
            {
                id                : accessTokenId,
                clientId          : client.id,
                scopes            : client.scopes,
                accountId,
                name              : client.name,
                expiredAccessToken: client.expiredAccessToken,
            },
        ));

        // create a JWT refresh tToken
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(
            {
                id                 : Utils.uuid(),
                accessTokenId,
                expiredRefreshToken: client.expiredRefreshToken,
            },
        ));

        // find token created with refresh token associated
        const accessToken = await this.queryBus.ask(new FindAccessTokenQuery(
            {
                where: {
                    id: accessTokenId,
                },
                include: [
                    {
                        model: OAuthRefreshTokenModel,
                        as   : 'refreshToken',
                    },
                ],
            },
        ));

        return {
            accessToken : accessToken.token,
            refreshToken: accessToken.refreshToken.token,
        };
    }
}