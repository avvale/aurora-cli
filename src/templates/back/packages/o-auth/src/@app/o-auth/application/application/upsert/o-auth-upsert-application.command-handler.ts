/* eslint-disable key-spacing */
import { OAuthUpsertApplicationCommand } from '@app/o-auth/application';
import { OAuthUpsertApplicationService } from '@app/o-auth/application/application/upsert/o-auth-upsert-application.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpsertApplicationCommand)
export class OAuthUpsertApplicationCommandHandler implements ICommandHandler<OAuthUpsertApplicationCommand>
{
    constructor(
        private readonly upsertApplicationService: OAuthUpsertApplicationService,
    ) {}

    async execute(command: OAuthUpsertApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationService.main(
            {
                id: new OAuthApplicationId(command.payload.id),
                code: new OAuthApplicationCode(command.payload.code),
                name: new OAuthApplicationName(command.payload.name),
                secret: new OAuthApplicationSecret(command.payload.secret),
                isMaster: new OAuthApplicationIsMaster(command.payload.isMaster),
                clientIds: new OAuthApplicationClientIds(command.payload.clientIds),
            },
            command.cQMetadata,
        );
    }
}
