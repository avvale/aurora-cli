/* eslint-disable comma-dangle */
import {
  OAuthAccessTokenHandlers,
  OAuthAccessTokenModel,
  OAuthAccessTokenSagas,
  OAuthAccessTokenServices,
  OAuthIAccessTokenRepository,
  OAuthSequelizeAccessTokenRepository,
} from './access-token';
import {
  OAuthApplicationHandlers,
  OAuthApplicationModel,
  OAuthApplicationSagas,
  OAuthApplicationServices,
  OAuthIApplicationRepository,
  OAuthSequelizeApplicationRepository,
} from './application';
import {
  OAuthApplicationClientHandlers,
  OAuthApplicationClientModel,
  OAuthApplicationClientSagas,
  OAuthApplicationClientServices,
  OAuthIApplicationClientRepository,
  OAuthSequelizeApplicationClientRepository,
} from './application-client';
import {
  OAuthClientHandlers,
  OAuthClientModel,
  OAuthClientSagas,
  OAuthClientServices,
  OAuthIClientRepository,
  OAuthSequelizeClientRepository,
} from './client';
import {
  OAuthIRefreshTokenRepository,
  OAuthRefreshTokenHandlers,
  OAuthRefreshTokenModel,
  OAuthRefreshTokenSagas,
  OAuthRefreshTokenServices,
  OAuthSequelizeRefreshTokenRepository,
} from './refresh-token';
import {
  OAuthIScopeRepository,
  OAuthScopeHandlers,
  OAuthScopeModel,
  OAuthScopeSagas,
  OAuthScopeServices,
  OAuthSequelizeScopeRepository,
} from './scope';

export const OAuthHandlers = [
  ...OAuthScopeHandlers,
  ...OAuthRefreshTokenHandlers,
  ...OAuthClientHandlers,
  ...OAuthApplicationClientHandlers,
  ...OAuthApplicationHandlers,
  ...OAuthAccessTokenHandlers,
];
export const OAuthServices = [
  ...OAuthScopeServices,
  ...OAuthRefreshTokenServices,
  ...OAuthClientServices,
  ...OAuthApplicationClientServices,
  ...OAuthApplicationServices,
  ...OAuthAccessTokenServices,
];
export const OAuthModels = [
  OAuthScopeModel,
  OAuthRefreshTokenModel,
  OAuthClientModel,
  OAuthApplicationClientModel,
  OAuthApplicationModel,
  OAuthAccessTokenModel,
];
export const OAuthRepositories = [
  {
    provide: OAuthIScopeRepository,
    useClass: OAuthSequelizeScopeRepository,
  },
  {
    provide: OAuthIRefreshTokenRepository,
    useClass: OAuthSequelizeRefreshTokenRepository,
  },
  {
    provide: OAuthIClientRepository,
    useClass: OAuthSequelizeClientRepository,
  },
  {
    provide: OAuthIApplicationClientRepository,
    useClass: OAuthSequelizeApplicationClientRepository,
  },
  {
    provide: OAuthIApplicationRepository,
    useClass: OAuthSequelizeApplicationRepository,
  },
  {
    provide: OAuthIAccessTokenRepository,
    useClass: OAuthSequelizeAccessTokenRepository,
  },
];
export const OAuthSagas = [
  OAuthScopeSagas,
  OAuthRefreshTokenSagas,
  OAuthClientSagas,
  OAuthApplicationClientSagas,
  OAuthApplicationSagas,
  OAuthAccessTokenSagas,
];
