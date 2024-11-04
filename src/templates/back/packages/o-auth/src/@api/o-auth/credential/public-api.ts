// controllers
import { OAuthCreateCredentialsController } from './controllers/o-auth-create-credentials.controller';
import { OAuthCreateImpersonalizeCredentialsController } from './controllers/o-auth-create-impersonalize-credentials.controller';

// resolvers
import { OAuthCreateCredentialsResolver } from './resolvers/o-auth-create-credentials.resolver';
import { OAuthCreateImpersonalizeCredentialsResolver } from './resolvers/o-auth-create-impersonalize-credentials.resolver';

// handlers
import { OAuthCreateCredentialsHandler } from './handlers/o-auth-create-credentials.handler';
import { OAuthCreateImpersonalizeCredentialsHandler } from './handlers/o-auth-create-impersonalize-credentials.handler';


export const OAuthCredentialControllers = [
    OAuthCreateCredentialsController,
    OAuthCreateImpersonalizeCredentialsController,
];

export const OAuthCredentialResolvers = [
    OAuthCreateCredentialsResolver,
    OAuthCreateImpersonalizeCredentialsResolver,
];

export const OAuthCredentialApiHandlers = [
    OAuthCreateCredentialsHandler,
    OAuthCreateImpersonalizeCredentialsHandler,
];