import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ICommandBus, IQueryBus, Utils } from 'aurora-ts-core';

// @apps
import { FindClientQuery } from '../../../../@apps/o-auth/client/application/find/find-client.query';
import { CreateAccessTokenCommand } from '../../../../@apps/o-auth/access-token/application/create/create-access-token.command';
import { CreateRefreshTokenCommand } from '../../../../@apps/o-auth/refresh-token/application/create/create-refresh-token.command';
import { FindAccessTokenQuery } from '../../../../@apps/o-auth/access-token/application/find/find-access-token.query';
import { FindAccountQuery } from '../../../../@apps/iam/account/application/find/find-account.query';
import { OAuthRefreshTokenModel } from '../../../../@apps/o-auth/refresh-token/infrastructure/sequelize/sequelize-refresh-token.model';
import { FindUserByUsernamePasswordQuery } from '../../../../@apps/iam/user/application/find/find-user-by-username-password.query';
import { FindApplicationByAuthorizationHeaderQuery } from '../../../../@apps/o-auth/application/application/find/find-application-by-authorization-header.query';
import { OAuthClientGrantType, OAuthCredential, OAuthCreateCredentialInput, IamAccountType } from '../../../../../graphql';
import { OAuthCreateCredentialDto, OAuthCredentialDto } from '../dto';

@Injectable()
export class OAuthCreateCredentialHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateCredentialInput | OAuthCreateCredentialDto,
        authorization: string,
    ): Promise<OAuthCredential | OAuthCredentialDto>
    {
        if (!payload.grantType) throw new BadRequestException('Value for grantType property must be defined, can not be undefined');

        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {
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

            // create a JWT access tToken
            const accessTokenId = Utils.uuid();
            await this.commandBus.dispatch(new CreateAccessTokenCommand(
                {
                    id                : accessTokenId,
                    clientId          : client.id,
                    scopes            : client.scopes,
                    accountId         : account.id,
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
            const accessTokenId = Utils.uuid();
            await this.commandBus.dispatch(new CreateAccessTokenCommand(
                {
                    id                : accessTokenId,
                    clientId          : client.id,
                    scopes            : client.scopes,
                    accountId         : user.account.id,
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

            // find token created with refreshToken associated
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
}