import {
    IamAccount,
    IamAccountType,
    OAuthClient,
    OAuthClientGrantType,
    OAuthCreateCredentialsInput,
    OAuthCredentials,
} from '@api/graphql';
import {
    IamFindAccountByIdQuery,
    IamFindAccountQuery,
    IamUpdateAccountByIdCommand,
} from '@app/iam/account';
import { IamGetRolesQuery } from '@app/iam/role/application/get/iam-get-roles.query';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { IamFindUserByUsernamePasswordQuery } from '@app/iam/user';
import {
    OAuthCreateAccessTokenCommand,
    OAuthDeleteAccessTokenByIdCommand,
    OAuthFindAccessTokenQuery,
} from '@app/o-auth/access-token';
import { OAuthFindApplicationByAuthorizationHeaderQuery } from '@app/o-auth/application';
import { OAuthFindClientQuery } from '@app/o-auth/client';
import { OAuthCreateCredentialCommand } from '@app/o-auth/credential';
import {
    OAuthCreateRefreshTokenCommand,
    OAuthFindRefreshTokenByIdQuery,
} from '@app/o-auth/refresh-token';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    now,
    Utils,
    uuid,
} from '@aurorajs.dev/core';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuthCreateCredentialsDto, OAuthCredentialsDto } from '../dto';

@Injectable()
export class OAuthCreateCredentialsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: OAuthCreateCredentialsInput | OAuthCreateCredentialsDto,
        authorization: string,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthCredentials | OAuthCredentialsDto> {
        if (!payload.grantType)
            throw new BadRequestException(
                'Value for grantType property must be defined, can not be undefined',
            );

        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE) {
            /**/
        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS) {
            try {
                // get account with username
                const account = await this.queryBus.ask(
                    new IamFindAccountQuery({
                        where: {
                            username: payload.username,
                            type: IamAccountType.SERVICE,
                            isActive: true,
                        },
                    }),
                );

                // get client
                const client = await this.queryBus.ask(
                    new OAuthFindClientQuery({
                        where: {
                            id: account.clientId,
                            secret: payload.clientSecret,
                            grantType: OAuthClientGrantType.CLIENT_CREDENTIALS,
                        },
                    }),
                );

                // get account to create credential and consolidate permissions
                await this.consolidatePermissions(
                    await this.queryBus.ask(
                        new IamFindAccountByIdQuery(account.id, {
                            include: [{ association: 'roles' }],
                        }),
                    ),
                    timezone,
                    auditing,
                );

                return await this.createCredential(client, account);
            } catch (error) {
                // if account not found throw unauthorized exception
                // if client not found throw unauthorized exception
                if (error.status === 404) {
                    throw new UnauthorizedException();
                }
                throw error;
            }
        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD) {
            // get user with username and password
            const user = await this.queryBus.ask(
                new IamFindUserByUsernamePasswordQuery(
                    payload.username,
                    payload.password,
                ),
            );

            // if not exist user throw error
            if (!user?.account?.isActive) throw new UnauthorizedException();

            // get account to create credential and consolidate permissions
            const account = await this.consolidatePermissions(
                await this.queryBus.ask(
                    new IamFindAccountByIdQuery(user.accountId, {
                        include: [{ association: 'roles' }],
                    }),
                ),
                timezone,
                auditing,
            );

            // get application and clients with header authorization basic authentication
            const application = await this.queryBus.ask(
                new OAuthFindApplicationByAuthorizationHeaderQuery(
                    authorization,
                ),
            );

            // if not exist application throw error
            if (!application) throw new UnauthorizedException();

            // TODO, como determinar a que cliente se autentifica?? a traves del clientId que contiene el usuario, por lo que tiene que coindir
            // la aplicación recuperada a través del authorization y el client que tiene la aplicación
            // get client associated with this application
            const client = application.clients.find(
                (client) => client.id === user.account.clientId,
            );

            // if not exist client throw error
            if (!client) throw new UnauthorizedException();

            // create a JWT access tToken
            return await this.createCredential(client, account);
        }

        if (payload.grantType === OAuthClientGrantType.REFRESH_TOKEN) {
            // get refresh token session
            const refreshTokenSession = this.jwtService.decode(
                payload.refreshToken,
            );

            // get refresh token aggregate
            const refreshTokenAggregate = await this.queryBus.ask(
                new OAuthFindRefreshTokenByIdQuery(refreshTokenSession.jit, {
                    include: [
                        {
                            association: 'accessToken',
                            include: [
                                {
                                    association: 'client',
                                },
                            ],
                        },
                    ],
                }),
            );

            // get account to create credential
            const account = await this.queryBus.ask(
                new IamFindAccountByIdQuery(
                    refreshTokenAggregate.accessToken.accountId,
                ),
            );

            // check that refresh token isn't expired
            if (refreshTokenSession.exp < parseInt(now().format('X')))
                throw new UnauthorizedException();

            // delete access token from database
            await this.commandBus.dispatch(
                new OAuthDeleteAccessTokenByIdCommand(
                    refreshTokenAggregate.accessTokenId,
                ),
            );

            return await this.createCredential(
                refreshTokenAggregate.accessToken.client,
                account,
            );
        }
    }

    private async createCredential(
        client: OAuthClient,
        account: IamAccount,
    ): Promise<OAuthCredentials | OAuthCredentialsDto> {
        // create a JWT access token
        const accessTokenId = uuid();
        await this.commandBus.dispatch(
            new OAuthCreateAccessTokenCommand({
                id: accessTokenId,
                clientId: client.id,
                scopes: account.scopes,
                accountId: account.id,
                name: client.name,
                expiredAccessToken: client.expiredAccessToken,
            }),
        );

        // create a JWT refresh token
        await this.commandBus.dispatch(
            new OAuthCreateRefreshTokenCommand({
                id: uuid(),
                accessTokenId,
                expiredRefreshToken: client.expiredRefreshToken,
            }),
        );

        // find token created with refresh token associated
        const accessToken = await this.queryBus.ask(
            new OAuthFindAccessTokenQuery({
                where: {
                    id: accessTokenId,
                },
                include: [
                    {
                        association: 'refreshToken',
                    },
                ],
            }),
        );

        // call command to trigger event with payload, this command has not side effect
        // in the database this is used to trigger the event and notify other microservices
        await this.commandBus.dispatch(
            new OAuthCreateCredentialCommand({
                grantType: client.grantType,
                accountId: account.id,
                username: account.username,
                clientSecret: client.secret,
                accessTokenId: accessToken.id,
                refreshToken: accessToken.refreshToken.token,
                redirect: client.redirect,
            }),
        );

        return {
            accessToken: accessToken.token,
            refreshToken: accessToken.refreshToken.token,
        };
    }

    private async consolidatePermissions(
        account: IamAccount,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount> {
        const roles = await this.queryBus.ask(
            new IamGetRolesQuery({
                where: {
                    id: account.roles.map((role) => role.id),
                },
                include: [{ association: 'permissions' }],
            }),
        );

        // get permissions from roles
        const dPermissions = iamCreatePermissionsFromRoles(roles);

        // check if account permissions are equals
        if (
            Utils.arraysHasSameValues(
                account.dPermissions.all,
                dPermissions.all,
            )
        ) {
            return account;
        }

        account.dPermissions = dPermissions;

        await this.commandBus.dispatch(
            new IamUpdateAccountByIdCommand(
                {
                    dPermissions: account.dPermissions,
                    id: account.id,
                },
                {},
                {
                    timezone,
                    repositoryOptions: {
                        auditing: {
                            ...auditing,
                            // overwrite account, because account is not available yet, in this point of application execution
                            account,
                        },
                    },
                },
            ),
        );

        return account;
    }
}
