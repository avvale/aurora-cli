// controllers
import { OAuthCreateCredentialController } from './controllers/o-auth-create-credential.controller';

// resolvers
import { OAuthCreateCredentialResolver } from './resolvers/o-auth-create-credential.resolver';

// handlers
import { OAuthCreateCredentialHandler } from './handlers/o-auth-create-credential.handler';

export const OAuthCredentialControllers = [
    OAuthCreateCredentialController,
];

export const OAuthCredentialResolvers = [
    OAuthCreateCredentialResolver,
];

export const OAuthCredentialApiHandlers = [
    OAuthCreateCredentialHandler,
];