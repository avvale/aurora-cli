/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpdateScopeByIdCommand } from './o-auth-update-scope-by-id.command';
import { OAuthUpdateScopeByIdService } from './o-auth-update-scope-by-id.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthUpdateScopeByIdCommand)
export class OAuthUpdateScopeByIdCommandHandler implements ICommandHandler<OAuthUpdateScopeByIdCommand>
{
    constructor(
        private readonly updateScopeByIdService: OAuthUpdateScopeByIdService,
    ) {}

    async execute(command: OAuthUpdateScopeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopeByIdService.main(
            {
                id: new OAuthScopeId(command.payload.id),
                code: new OAuthScopeCode(command.payload.code, { undefinable: true }),
                name: new OAuthScopeName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
