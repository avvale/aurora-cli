/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthUpdateAndIncrementApplicationsClientsService } from '@app/o-auth/application-client/application/update/o-auth-update-and-increment-applications-clients.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementApplicationsClientsCommand)
export class OAuthUpdateAndIncrementApplicationsClientsCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementApplicationsClientsCommand>
{
    constructor(
        private readonly updateApplicationsClientsService: OAuthUpdateAndIncrementApplicationsClientsService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementApplicationsClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationsClientsService.main(
            {
                applicationId: new OAuthApplicationClientApplicationId(command.payload.applicationId, { undefinable: true }),
                clientId: new OAuthApplicationClientClientId(command.payload.clientId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
