/* #region customizations */
import {
  OAuthCredentialHandlers,
  OAuthCredentialServices,
} from '@app/o-auth/credential';
/* #endregion customizations */

import {
  OAuthHandlers,
  OAuthModels,
  OAuthRepositories,
  OAuthSagas,
  OAuthServices,
} from '@app/o-auth';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  OAuthAccessTokenApiControllers,
  OAuthAccessTokenApiHandlers,
  OAuthAccessTokenApiResolvers,
  OAuthAccessTokenApiServices,
} from './access-token';
import {
  OAuthApplicationApiControllers,
  OAuthApplicationApiHandlers,
  OAuthApplicationApiResolvers,
  OAuthApplicationApiServices,
} from './application';
import {
  OAuthApplicationClientApiControllers,
  OAuthApplicationClientApiHandlers,
  OAuthApplicationClientApiResolvers,
  OAuthApplicationClientApiServices,
} from './application-client';
import {
  OAuthClientApiControllers,
  OAuthClientApiHandlers,
  OAuthClientApiResolvers,
  OAuthClientApiServices,
} from './client';
import {
  OAuthCredentialApiHandlers,
  OAuthCredentialControllers,
  OAuthCredentialResolvers,
} from './credential';
import { OAuthSeeder } from './o-auth.seeder';
import {
  OAuthRefreshTokenApiControllers,
  OAuthRefreshTokenApiHandlers,
  OAuthRefreshTokenApiResolvers,
  OAuthRefreshTokenApiServices,
} from './refresh-token';
import {
  OAuthScopeApiControllers,
  OAuthScopeApiHandlers,
  OAuthScopeApiResolvers,
  OAuthScopeApiServices,
} from './scope';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...OAuthModels])],
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
