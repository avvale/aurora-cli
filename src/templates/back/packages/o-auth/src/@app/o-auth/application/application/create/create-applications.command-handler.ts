/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationsCommand } from './create-applications.command';
import { CreateApplicationsService } from './create-applications.service';
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

@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsCommandHandler implements ICommandHandler<CreateApplicationsCommand>
{
    constructor(
        private readonly createApplicationsService: CreateApplicationsService,
    ) {}

    async execute(command: CreateApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationsService.main(
            command.payload
                .map(application =>
                {
                    return {
                        id: new ApplicationId(application.id),
                        code: new ApplicationCode(application.code),
                        name: new ApplicationName(application.name),
                        secret: new ApplicationSecret(application.secret),
                        isMaster: new ApplicationIsMaster(application.isMaster),
                        clientIds: new ApplicationClientIds(application.clientIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}