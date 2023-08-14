/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpsertApplicationCommand } from './o-auth-upsert-application.command';
import { OAuthUpsertApplicationService } from './o-auth-upsert-application.service';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';

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
