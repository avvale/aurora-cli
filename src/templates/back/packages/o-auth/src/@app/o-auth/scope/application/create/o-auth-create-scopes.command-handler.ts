/* eslint-disable key-spacing */
import { OAuthCreateScopesCommand } from '@app/o-auth/scope';
import { OAuthCreateScopesService } from '@app/o-auth/scope/application/create/o-auth-create-scopes.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
