/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicationsCommand } from './update-applications.command';
import { UpdateApplicationsService } from './update-applications.service';
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

@CommandHandler(UpdateApplicationsCommand)
export class UpdateApplicationsCommandHandler implements ICommandHandler<UpdateApplicationsCommand>
{
    constructor(
        private readonly updateApplicationsService: UpdateApplicationsService,
    ) {}

    async execute(command: UpdateApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationsService.main(
            {
                id: new ApplicationId(command.payload.id, { undefinable: true }),
                name: new ApplicationName(command.payload.name, { undefinable: true }),
                code: new ApplicationCode(command.payload.code, { undefinable: true }),
                secret: new ApplicationSecret(command.payload.secret, { undefinable: true }),
                isMaster: new ApplicationIsMaster(command.payload.isMaster, { undefinable: true }),
                clientIds: new ApplicationClientIds(command.payload.clientIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}