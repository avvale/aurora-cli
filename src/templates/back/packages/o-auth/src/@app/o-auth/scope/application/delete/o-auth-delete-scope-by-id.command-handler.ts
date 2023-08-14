import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteScopeByIdCommand } from './o-auth-delete-scope-by-id.command';
import { OAuthDeleteScopeByIdService } from './o-auth-delete-scope-by-id.service';
import {
    OAuthScopeId
} from '../../domain/value-objects';

@CommandHandler(OAuthDeleteScopeByIdCommand)
export class OAuthDeleteScopeByIdCommandHandler implements ICommandHandler<OAuthDeleteScopeByIdCommand>
{
    constructor(
        private readonly deleteScopeByIdService: OAuthDeleteScopeByIdService,
    ) {}

    async execute(command: OAuthDeleteScopeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteScopeByIdService.main(
            new OAuthScopeId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
