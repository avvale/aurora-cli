/* eslint-disable comma-dangle */
import { OAuthScopeHandlers, OAuthScopeServices, OAuthScopeModel, OAuthIScopeRepository, OAuthSequelizeScopeRepository, OAuthScopeSagas } from './scope';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, OAuthIRefreshTokenRepository, OAuthSequelizeRefreshTokenRepository, OAuthRefreshTokenSagas } from './refresh-token';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, OAuthIClientRepository, OAuthSequelizeClientRepository, OAuthClientSagas } from './client';
import { OAuthApplicationClientHandlers, OAuthApplicationClientServices, OAuthApplicationClientModel, OAuthIApplicationClientRepository, OAuthSequelizeApplicationClientRepository, OAuthApplicationClientSagas } from './application-client';
import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, OAuthIApplicationRepository, OAuthSequelizeApplicationRepository, OAuthApplicationSagas } from './application';
import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, OAuthIAccessTokenRepository, OAuthSequelizeAccessTokenRepository, OAuthAccessTokenSagas } from './access-token';

export const OAuthHandlers = [
    ...OAuthScopeHandlers,
    ...OAuthRefreshTokenHandlers,
    ...OAuthClientHandlers,
    ...OAuthApplicationClientHandlers,
    ...OAuthApplicationHandlers,
    ...OAuthAccessTokenHandlers
];
export const OAuthServices = [
    ...OAuthScopeServices,
    ...OAuthRefreshTokenServices,
    ...OAuthClientServices,
    ...OAuthApplicationClientServices,
    ...OAuthApplicationServices,
    ...OAuthAccessTokenServices
];
export const OAuthModels = [
    OAuthScopeModel,
    OAuthRefreshTokenModel,
    OAuthClientModel,
    OAuthApplicationClientModel,
    OAuthApplicationModel,
    OAuthAccessTokenModel
];
export const OAuthRepositories = [
    {
        provide : OAuthIScopeRepository,
        useClass: OAuthSequelizeScopeRepository,
    },
    {
        provide : OAuthIRefreshTokenRepository,
        useClass: OAuthSequelizeRefreshTokenRepository,
    },
    {
        provide : OAuthIClientRepository,
        useClass: OAuthSequelizeClientRepository,
    },
    {
        provide : OAuthIApplicationClientRepository,
        useClass: OAuthSequelizeApplicationClientRepository,
    },
    {
        provide : OAuthIApplicationRepository,
        useClass: OAuthSequelizeApplicationRepository,
    },
    {
        provide : OAuthIAccessTokenRepository,
        useClass: OAuthSequelizeAccessTokenRepository,
    }
];
export const OAuthSagas = [
    OAuthScopeSagas,
    OAuthRefreshTokenSagas,
    OAuthClientSagas,
    OAuthApplicationClientSagas,
    OAuthApplicationSagas,
    OAuthAccessTokenSagas
];
