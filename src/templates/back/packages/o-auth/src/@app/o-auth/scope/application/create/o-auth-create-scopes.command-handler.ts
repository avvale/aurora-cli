/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateScopesCommand } from './o-auth-create-scopes.command';
import { OAuthCreateScopesService } from './o-auth-create-scopes.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthCreateScopesCommand)
export class OAuthCreateScopesCommandHandler implements ICommandHandler<OAuthCreateScopesCommand>
{
    constructor(
        private readonly createScopesService: OAuthCreateScopesService,
    ) {}

    async execute(command: OAuthCreateScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createScopesService.main(
            command.payload
                .map(scope =>
                {
                    return {
                        id: new OAuthScopeId(scope.id),
                        code: new OAuthScopeCode(scope.code),
                        name: new OAuthScopeName(scope.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}
