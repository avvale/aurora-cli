/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicationCommand } from './update-application.command';
import { UpdateApplicationService } from './update-application.service';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationCommandHandler implements ICommandHandler<UpdateApplicationCommand>
{
    constructor(
        private readonly updateApplicationService: UpdateApplicationService,
    ) {}

    async execute(command: UpdateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationService.main(
            {
                id: new ApplicationId(command.payload.id),
                name: new ApplicationName(command.payload.name, { undefinable: true }),
                code: new ApplicationCode(command.payload.code, { undefinable: true }),
                secret: new ApplicationSecret(command.payload.secret, { undefinable: true }),
                isMaster: new ApplicationIsMaster(command.payload.isMaster, { undefinable: true }),
                clientIds: new ApplicationClientIds(command.payload.clientIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}