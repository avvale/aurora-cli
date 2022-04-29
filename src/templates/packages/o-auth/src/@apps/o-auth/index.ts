import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas, OAuthApplicationsClientsModel } from './application';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, IClientRepository, SequelizeClientRepository, ClientSagas } from './client';
import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, IAccessTokenRepository, SequelizeAccessTokenRepository, AccessTokenSagas } from './access-token';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, IRefreshTokenRepository, SequelizeRefreshTokenRepository, RefreshTokenSagas } from './refresh-token';

export const OAuthHandlers = [
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthAccessTokenHandlers,
    ...OAuthRefreshTokenHandlers
];
export const OAuthServices = [
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthAccessTokenServices,
    ...OAuthRefreshTokenServices
];
export const OAuthModels = [
    OAuthApplicationModel,
    OAuthApplicationsClientsModel,
    OAuthClientModel,
    OAuthAccessTokenModel,
    OAuthRefreshTokenModel
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
    }
];
export const OAuthSagas = [
    ApplicationSagas,
    ClientSagas,
    AccessTokenSagas,
    RefreshTokenSagas
];
