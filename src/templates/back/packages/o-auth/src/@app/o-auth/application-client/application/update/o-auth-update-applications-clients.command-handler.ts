/* eslint-disable key-spacing */
import { OAuthUpdateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthUpdateApplicationsClientsService } from '@app/o-auth/application-client/application/update/o-auth-update-applications-clients.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateApplicationsClientsCommand)
export class OAuthUpdateApplicationsClientsCommandHandler implements ICommandHandler<OAuthUpdateApplicationsClientsCommand>
{
    constructor(
        private readonly updateApplicationsClientsService: OAuthUpdateApplicationsClientsService,
    ) {}

    async execute(command: OAuthUpdateApplicationsClientsCommand): Promise<void>
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
