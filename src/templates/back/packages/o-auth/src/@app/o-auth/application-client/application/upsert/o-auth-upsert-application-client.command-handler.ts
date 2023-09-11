/* eslint-disable key-spacing */
import { OAuthUpsertApplicationClientCommand } from '@app/o-auth/application-client';
import { OAuthUpsertApplicationClientService } from '@app/o-auth/application-client/application/upsert/o-auth-upsert-application-client.service';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpsertApplicationClientCommand)
export class OAuthUpsertApplicationClientCommandHandler implements ICommandHandler<OAuthUpsertApplicationClientCommand>
{
    constructor(
        private readonly upsertApplicationClientService: OAuthUpsertApplicationClientService,
    ) {}

    async execute(command: OAuthUpsertApplicationClientCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationClientService.main(
            {
                applicationId: new OAuthApplicationClientApplicationId(command.payload.applicationId),
                clientId: new OAuthApplicationClientClientId(command.payload.clientId),
            },
            command.cQMetadata,
        );
    }
}
