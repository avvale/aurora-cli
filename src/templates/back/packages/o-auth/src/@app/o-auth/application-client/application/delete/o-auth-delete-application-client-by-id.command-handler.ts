import { OAuthDeleteApplicationClientByIdCommand } from '@app/o-auth/application-client';
import { OAuthDeleteApplicationClientByIdService } from '@app/o-auth/application-client/application/delete/o-auth-delete-application-client-by-id.service';
import { OAuthApplicationClientApplicationId, OAuthApplicationClientClientId } from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteApplicationClientByIdCommand)
export class OAuthDeleteApplicationClientByIdCommandHandler implements ICommandHandler<OAuthDeleteApplicationClientByIdCommand>
{
    constructor(
        private readonly deleteApplicationClientByIdService: OAuthDeleteApplicationClientByIdService,
    ) {}

    async execute(command: OAuthDeleteApplicationClientByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationClientByIdService.main(
            new OAuthApplicationClientApplicationId(command.applicationId),
            new OAuthApplicationClientClientId(command.clientId),
            command.constraint,
            command.cQMetadata,
        );
    }
}
