/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpdateScopesCommand } from './o-auth-update-scopes.command';
import { OAuthUpdateScopesService } from './o-auth-update-scopes.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthUpdateScopesCommand)
export class OAuthUpdateScopesCommandHandler implements ICommandHandler<OAuthUpdateScopesCommand>
{
    constructor(
        private readonly updateScopesService: OAuthUpdateScopesService,
    ) {}

    async execute(command: OAuthUpdateScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopesService.main(
            {
                id: new OAuthScopeId(command.payload.id, { undefinable: true }),
                code: new OAuthScopeCode(command.payload.code, { undefinable: true }),
                name: new OAuthScopeName(command.payload.name, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
