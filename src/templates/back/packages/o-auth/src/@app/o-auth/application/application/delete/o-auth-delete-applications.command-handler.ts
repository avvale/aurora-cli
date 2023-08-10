import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteApplicationsCommand } from './o-auth-delete-applications.command';
import { OAuthDeleteApplicationsService } from './o-auth-delete-applications.service';

@CommandHandler(OAuthDeleteApplicationsCommand)
export class OAuthDeleteApplicationsCommandHandler implements ICommandHandler<OAuthDeleteApplicationsCommand>
{
    constructor(
        private readonly deleteApplicationsService: OAuthDeleteApplicationsService,
    ) {}

    async execute(command: OAuthDeleteApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
