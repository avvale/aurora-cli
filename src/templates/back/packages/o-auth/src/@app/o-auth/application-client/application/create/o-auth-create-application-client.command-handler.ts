/* eslint-disable key-spacing */
import { OAuthCreateApplicationClientCommand } from '@app/o-auth/application-client';
import { OAuthCreateApplicationClientService } from '@app/o-auth/application-client/application/create/o-auth-create-application-client.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateApplicationClientCommand)
export class OAuthCreateApplicationClientCommandHandler
    implements ICommandHandler<OAuthCreateApplicationClientCommand>
{
    constructor(
        private readonly createApplicationClientService: OAuthCreateApplicationClientService,
    ) {}

    async execute(command: OAuthCreateApplicationClientCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createApplicationClientService.main(
            {
                applicationId: new OAuthApplicationClientApplicationId(
                    command.payload.applicationId,
                ),
                clientId: new OAuthApplicationClientClientId(
                    command.payload.clientId,
                ),
            },
            command.cQMetadata,
        );
    }
}
