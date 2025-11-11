/* eslint-disable key-spacing */
import { OAuthCreateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthCreateApplicationsClientsService } from '@app/o-auth/application-client/application/create/o-auth-create-applications-clients.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateApplicationsClientsCommand)
export class OAuthCreateApplicationsClientsCommandHandler
    implements ICommandHandler<OAuthCreateApplicationsClientsCommand>
{
    constructor(
        private readonly createApplicationsClientsService: OAuthCreateApplicationsClientsService,
    ) {}

    async execute(
        command: OAuthCreateApplicationsClientsCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createApplicationsClientsService.main(
            command.payload.map((applicationClient) => {
                return {
                    applicationId: new OAuthApplicationClientApplicationId(
                        applicationClient.applicationId,
                    ),
                    clientId: new OAuthApplicationClientClientId(
                        applicationClient.clientId,
                    ),
                };
            }),
            command.cQMetadata,
        );
    }
}
