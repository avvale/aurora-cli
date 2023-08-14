import { OAuthAccessTokenHandlers, OAuthAccessTokenModel, OAuthAccessTokenSagas, OAuthAccessTokenServices, OAuthIAccessTokenRepository, OAuthSequelizeAccessTokenRepository } from './access-token';
import { OAuthApplicationHandlers, OAuthApplicationModel, OAuthApplicationSagas, OAuthApplicationServices, OAuthApplicationsClientsModel, OAuthIApplicationRepository, OAuthSequelizeApplicationRepository } from './application';
import { OAuthClientHandlers, OAuthClientModel, OAuthClientSagas, OAuthClientServices, OAuthIClientRepository, OAuthSequelizeClientRepository } from './client';
import { OAuthIRefreshTokenRepository, OAuthRefreshTokenHandlers, OAuthRefreshTokenModel, OAuthRefreshTokenSagas, OAuthRefreshTokenServices, OAuthSequelizeRefreshTokenRepository } from './refresh-token';
import { OAuthIScopeRepository, OAuthScopeHandlers, OAuthScopeModel, OAuthScopeSagas, OAuthScopeServices, OAuthSequelizeScopeRepository } from './scope';

export const OAuthHandlers = [
    ...OAuthAccessTokenHandlers,
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthRefreshTokenHandlers,
    ...OAuthScopeHandlers
];
export const OAuthServices = [
    ...OAuthAccessTokenServices,
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthRefreshTokenServices,
    ...OAuthScopeServices
];
export const OAuthModels = [
    OAuthAccessTokenModel,
    OAuthApplicationModel,
    OAuthApplicationsClientsModel,
    OAuthClientModel,
    OAuthRefreshTokenModel,
    OAuthScopeModel
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
    }
];
export const OAuthSagas = [
    OAuthAccessTokenSagas,
    OAuthApplicationSagas,
    OAuthClientSagas,
    OAuthRefreshTokenSagas,
    OAuthScopeSagas
];
