/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertJobRegistryCommand } from './upsert-job-registry.command';
import { UpsertJobRegistryService } from './upsert-job-registry.service';
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

@CommandHandler(UpsertJobRegistryCommand)
export class UpsertJobRegistryCommandHandler implements ICommandHandler<UpsertJobRegistryCommand>
{
    constructor(
        private readonly upsertJobRegistryService: UpsertJobRegistryService,
    ) {}

    async execute(command: UpsertJobRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertJobRegistryService.main(
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