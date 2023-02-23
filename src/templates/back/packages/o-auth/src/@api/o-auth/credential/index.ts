// controllers
import { OAuthCreateCredentialsController } from './controllers/o-auth-create-credentials.controller';

// resolvers
import { OAuthCreateCredentialsResolver } from './resolvers/o-auth-create-credentials.resolver';

// handlers
import { OAuthCreateCredentialsHandler } from './handlers/o-auth-create-credentials.handler';

export const OAuthCredentialControllers = [
    OAuthCreateCredentialsController,
];

export const OAuthCredentialResolvers = [
    OAuthCreateCredentialsResolver,
];

export const OAuthCredentialApiHandlers = [
    OAuthCreateCredentialsHandler,
];