import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteApplicationByIdCommand } from './o-auth-delete-application-by-id.command';
import { OAuthDeleteApplicationByIdService } from './o-auth-delete-application-by-id.service';
import {
    OAuthApplicationId
} from '../../domain/value-objects';

@CommandHandler(OAuthDeleteApplicationByIdCommand)
export class OAuthDeleteApplicationByIdCommandHandler implements ICommandHandler<OAuthDeleteApplicationByIdCommand>
{
    constructor(
        private readonly deleteApplicationByIdService: OAuthDeleteApplicationByIdService,
    ) {}

    async execute(command: OAuthDeleteApplicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationByIdService.main(
            new OAuthApplicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
