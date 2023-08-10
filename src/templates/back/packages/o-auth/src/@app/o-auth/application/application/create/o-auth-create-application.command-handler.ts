/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateApplicationCommand } from './o-auth-create-application.command';
import { OAuthCreateApplicationService } from './o-auth-create-application.service';
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

@CommandHandler(OAuthCreateApplicationCommand)
export class OAuthCreateApplicationCommandHandler implements ICommandHandler<OAuthCreateApplicationCommand>
{
    constructor(
        private readonly createApplicationService: OAuthCreateApplicationService,
    ) {}

    async execute(command: OAuthCreateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationService.main(
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
