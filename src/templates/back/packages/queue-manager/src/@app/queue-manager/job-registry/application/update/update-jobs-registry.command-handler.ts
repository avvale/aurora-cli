/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobsRegistryCommand } from './update-jobs-registry.command';
import { UpdateJobsRegistryService } from './update-jobs-registry.service';
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

@CommandHandler(UpdateJobsRegistryCommand)
export class UpdateJobsRegistryCommandHandler implements ICommandHandler<UpdateJobsRegistryCommand>
{
    constructor(
        private readonly updateJobsRegistryService: UpdateJobsRegistryService,
    ) {}

    async execute(command: UpdateJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobsRegistryService.main(
            {
                id: new JobRegistryId(command.payload.id, { undefinable: true }),
                queueName: new JobRegistryQueueName(command.payload.queueName, { undefinable: true }),
                jobId: new JobRegistryJobId(command.payload.jobId, { undefinable: true }),
                jobName: new JobRegistryJobName(command.payload.jobName),
                tags: new JobRegistryTags(command.payload.tags),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}