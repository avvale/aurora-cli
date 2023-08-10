import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteClientByIdCommand } from './o-auth-delete-client-by-id.command';
import { OAuthDeleteClientByIdService } from './o-auth-delete-client-by-id.service';
import {
    OAuthClientId
} from '../../domain/value-objects';

@CommandHandler(OAuthDeleteClientByIdCommand)
export class OAuthDeleteClientByIdCommandHandler implements ICommandHandler<OAuthDeleteClientByIdCommand>
{
    constructor(
        private readonly deleteClientByIdService: OAuthDeleteClientByIdService,
    ) {}

    async execute(command: OAuthDeleteClientByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteClientByIdService.main(
            new OAuthClientId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
