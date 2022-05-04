import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas, OAuthApplicationsClientsModel } from './application';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, IClientRepository, SequelizeClientRepository, ClientSagas } from './client';
import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, IAccessTokenRepository, SequelizeAccessTokenRepository, AccessTokenSagas } from './access-token';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, IRefreshTokenRepository, SequelizeRefreshTokenRepository, RefreshTokenSagas } from './refresh-token';
import { OAuthScopeHandlers, OAuthScopeServices, OAuthScopeModel, IScopeRepository, SequelizeScopeRepository, ScopeSagas } from './scope';

export const OAuthHandlers = [
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthAccessTokenHandlers,
    ...OAuthRefreshTokenHandlers,
    ...OAuthScopeHandlers
];
export const OAuthServices = [
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthAccessTokenServices,
    ...OAuthRefreshTokenServices,
    ...OAuthScopeServices
];
export const OAuthModels = [
    OAuthApplicationModel,
    OAuthApplicationsClientsModel,
    OAuthClientModel,
    OAuthAccessTokenModel,
    OAuthRefreshTokenModel,
    OAuthScopeModel
];
export const OAuthRepositories = [
    {
        provide : IApplicationRepository,
        useClass: SequelizeApplicationRepository
    },
    {
        provide : IClientRepository,
        useClass: SequelizeClientRepository
    },
    {
        provide : IAccessTokenRepository,
        useClass: SequelizeAccessTokenRepository
    },
    {
        provide : IRefreshTokenRepository,
        useClass: SequelizeRefreshTokenRepository
    },
    {
        provide : IScopeRepository,
        useClass: SequelizeScopeRepository
    }
];
export const OAuthSagas = [
    ApplicationSagas,
    ClientSagas,
    AccessTokenSagas,
    RefreshTokenSagas,
    ScopeSagas
];
