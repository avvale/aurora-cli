/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationCommand } from './create-application.command';
import { CreateApplicationService } from './create-application.service';
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

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationCommandHandler implements ICommandHandler<CreateApplicationCommand>
{
    constructor(
        private readonly createApplicationService: CreateApplicationService,
    ) {}

    async execute(command: CreateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationService.main(
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