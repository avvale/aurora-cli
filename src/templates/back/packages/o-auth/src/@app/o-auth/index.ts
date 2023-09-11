import { OAuthAccessTokenHandlers, OAuthAccessTokenModel, OAuthAccessTokenSagas, OAuthAccessTokenServices, OAuthIAccessTokenRepository, OAuthSequelizeAccessTokenRepository } from './access-token';
import { OAuthApplicationHandlers, OAuthApplicationModel, OAuthApplicationSagas, OAuthApplicationServices, OAuthIApplicationRepository, OAuthSequelizeApplicationRepository } from './application';
import { OAuthClientHandlers, OAuthClientModel, OAuthClientSagas, OAuthClientServices, OAuthIClientRepository, OAuthSequelizeClientRepository } from './client';
import { OAuthIRefreshTokenRepository, OAuthRefreshTokenHandlers, OAuthRefreshTokenModel, OAuthRefreshTokenSagas, OAuthRefreshTokenServices, OAuthSequelizeRefreshTokenRepository } from './refresh-token';
import { OAuthIScopeRepository, OAuthScopeHandlers, OAuthScopeModel, OAuthScopeSagas, OAuthScopeServices, OAuthSequelizeScopeRepository } from './scope';
import { OAuthApplicationClientHandlers, OAuthApplicationClientServices, OAuthApplicationClientModel, OAuthSequelizeApplicationClientRepository, OAuthApplicationClientSagas, OAuthIApplicationClientRepository } from './application-client';

export const OAuthHandlers = [
    ...OAuthAccessTokenHandlers,
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthRefreshTokenHandlers,
    ...OAuthScopeHandlers,
    ...OAuthApplicationClientHandlers
];
export const OAuthServices = [
    ...OAuthAccessTokenServices,
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthRefreshTokenServices,
    ...OAuthScopeServices,
    ...OAuthApplicationClientServices
];
export const OAuthModels = [
    OAuthAccessTokenModel,
    OAuthApplicationModel,
    OAuthClientModel,
    OAuthRefreshTokenModel,
    OAuthScopeModel,
    OAuthApplicationClientModel
];
export const OAuthRepositories = [
    {
        provide : OAuthIAccessTokenRepository,
        useClass: OAuthSequelizeAccessTokenRepository
    },
    {
        provide : OAuthIApplicationRepository,
        useClass: OAuthSequelizeApplicationRepository
    },
    {
        provide : OAuthIClientRepository,
        useClass: OAuthSequelizeClientRepository
    },
    {
        provide : OAuthIRefreshTokenRepository,
        useClass: OAuthSequelizeRefreshTokenRepository
    },
    {
        provide : OAuthIScopeRepository,
        useClass: OAuthSequelizeScopeRepository
    },
    {
        provide : OAuthIApplicationClientRepository,
        useClass: OAuthSequelizeApplicationClientRepository
    }
];
export const OAuthSagas = [
    OAuthAccessTokenSagas,
    OAuthApplicationSagas,
    OAuthClientSagas,
    OAuthRefreshTokenSagas,
    OAuthScopeSagas,
    OAuthApplicationClientSagas
];
