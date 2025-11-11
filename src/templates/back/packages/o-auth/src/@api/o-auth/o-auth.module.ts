/* #region customizations */
import { OAuthCredentialHandlers, OAuthCredentialServices } from '@app/o-auth/credential';
/* #endregion customizations */

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { OAuthSeeder } from './o-auth.seeder';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@app/o-auth';
import { OAuthApplicationApiHandlers, OAuthApplicationApiControllers, OAuthApplicationApiResolvers, OAuthApplicationApiServices } from './application';
import { OAuthClientApiHandlers, OAuthClientApiControllers, OAuthClientApiResolvers, OAuthClientApiServices } from './client';
import { OAuthAccessTokenApiHandlers, OAuthAccessTokenApiControllers, OAuthAccessTokenApiResolvers, OAuthAccessTokenApiServices } from './access-token';
import { OAuthRefreshTokenApiHandlers, OAuthRefreshTokenApiControllers, OAuthRefreshTokenApiResolvers, OAuthRefreshTokenApiServices } from './refresh-token';
import { OAuthCredentialControllers, OAuthCredentialResolvers, OAuthCredentialApiHandlers } from './credential';
import { OAuthScopeApiHandlers, OAuthScopeApiControllers, OAuthScopeApiResolvers, OAuthScopeApiServices } from './scope';
import { OAuthApplicationClientApiControllers, OAuthApplicationClientApiResolvers, OAuthApplicationClientApiHandlers, OAuthApplicationClientApiServices } from './application-client';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...OAuthModels,
        ]),
    ],
    controllers: [
        ...OAuthAccessTokenApiControllers,
        ...OAuthCredentialControllers,
        ...OAuthScopeApiControllers,
        ...OAuthRefreshTokenApiControllers,
        ...OAuthApplicationApiControllers,
        ...OAuthApplicationClientApiControllers,
        ...OAuthClientApiControllers,
    ],
    providers: [
        /* #region customizations */
        ...OAuthCredentialHandlers,
        ...OAuthCredentialServices,
        /* #endregion customizations */

        OAuthSeeder,
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthApplicationApiHandlers,
        ...OAuthClientApiHandlers,
        ...OAuthScopeApiHandlers,
        ...OAuthAccessTokenApiHandlers,
        ...OAuthRefreshTokenApiHandlers,
        ...OAuthCredentialResolvers,
        ...OAuthCredentialApiHandlers,
        ...OAuthAccessTokenApiServices,
        ...OAuthAccessTokenApiResolvers,
        ...OAuthScopeApiResolvers,
        ...OAuthScopeApiServices,
        ...OAuthRefreshTokenApiResolvers,
        ...OAuthRefreshTokenApiServices,
        ...OAuthApplicationApiResolvers,
        ...OAuthApplicationApiServices,
        ...OAuthApplicationClientApiResolvers,
        ...OAuthApplicationClientApiHandlers,
        ...OAuthApplicationClientApiServices,
        ...OAuthClientApiResolvers,
        ...OAuthClientApiServices,
    ],
})
export class OAuthModule {}
