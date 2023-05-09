/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobRegistryCommand } from './create-job-registry.command';
import { CreateJobRegistryService } from './create-job-registry.service';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateJobRegistryCommand)
export class CreateJobRegistryCommandHandler implements ICommandHandler<CreateJobRegistryCommand>
{
    constructor(
        private readonly createJobRegistryService: CreateJobRegistryService,
    ) {}

    async execute(command: CreateJobRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobRegistryService.main(
            {
                id: new JobRegistryId(command.payload.id),
                queueName: new JobRegistryQueueName(command.payload.queueName),
                jobId: new JobRegistryJobId(command.payload.jobId),
                jobName: new JobRegistryJobName(command.payload.jobName),
                tags: new JobRegistryTags(command.payload.tags),
            },
            command.cQMetadata,
        );
    }
}