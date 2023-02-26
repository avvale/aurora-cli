/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertApplicationCommand } from './upsert-application.command';
import { UpsertApplicationService } from './upsert-application.service';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertApplicationCommand)
export class UpsertApplicationCommandHandler implements ICommandHandler<UpsertApplicationCommand>
{
    constructor(
        private readonly upsertApplicationService: UpsertApplicationService,
    ) {}

    async execute(command: UpsertApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationService.main(
            {
                id: new ApplicationId(command.payload.id),
                code: new ApplicationCode(command.payload.code),
                name: new ApplicationName(command.payload.name),
                secret: new ApplicationSecret(command.payload.secret),
                isMaster: new ApplicationIsMaster(command.payload.isMaster),
                clientIds: new ApplicationClientIds(command.payload.clientIds),
            },
            command.cQMetadata,
        );
    }
}