/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicationByIdCommand } from './update-application-by-id.command';
import { UpdateApplicationByIdService } from './update-application-by-id.service';
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

@CommandHandler(UpdateApplicationByIdCommand)
export class UpdateApplicationByIdCommandHandler implements ICommandHandler<UpdateApplicationByIdCommand>
{
    constructor(
        private readonly updateApplicationByIdService: UpdateApplicationByIdService,
    ) {}

    async execute(command: UpdateApplicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationByIdService.main(
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