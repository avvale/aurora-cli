// export commands
export { OAuthCreateCredentialCommand } from './application/create/o-auth-create-credential.command';

// export queries

// export mocks

// export events
export { OAuthCreatedCredentialEvent } from './application/events/o-auth-created-credential.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthCredential } from './domain/o-auth-credential.aggregate';

// infrastructure

// sagas

// command handlers
import { OAuthCreateCredentialCommandHandler } from './application/create/o-auth-create-credential.command-handler';

// query handlers

// event handlers
import { OAuthCreatedCredentialEventHandler } from './application/events/o-auth-created-credential.event-handler';

// services
import { OAuthCreateCredentialService } from './application/create/o-auth-create-credential.service';

export const OAuthCredentialHandlers = [
    // commands
    OAuthCreateCredentialCommandHandler,

    // queries

    // events
    OAuthCreatedCredentialEventHandler,
];

export const OAuthCredentialServices = [OAuthCreateCredentialService];
