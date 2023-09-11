/* eslint-disable key-spacing */
import { OAuthUpdateApplicationClientByIdCommand } from '@app/o-auth/application-client';
import { OAuthUpdateApplicationClientByIdService } from '@app/o-auth/application-client/application/update/o-auth-update-application-client-by-id.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateApplicationClientByIdCommand)
export class OAuthUpdateApplicationClientByIdCommandHandler implements ICommandHandler<OAuthUpdateApplicationClientByIdCommand>
{
    constructor(
        private readonly updateApplicationClientByIdService: OAuthUpdateApplicationClientByIdService,
    ) {}

    async execute(command: OAuthUpdateApplicationClientByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationClientByIdService.main(
            {
                applicationId: new OAuthApplicationClientApplicationId(command.payload.applicationId),
                clientId: new OAuthApplicationClientClientId(command.payload.clientId),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
