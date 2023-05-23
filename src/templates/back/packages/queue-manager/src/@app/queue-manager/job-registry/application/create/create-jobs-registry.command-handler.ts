/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobsRegistryCommand } from './create-jobs-registry.command';
import { CreateJobsRegistryService } from './create-jobs-registry.service';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryState,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateJobsRegistryCommand)
export class CreateJobsRegistryCommandHandler implements ICommandHandler<CreateJobsRegistryCommand>
{
    constructor(
        private readonly createJobsRegistryService: CreateJobsRegistryService,
    ) {}

    async execute(command: CreateJobsRegistryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createJobsRegistryService.main(
            command.payload
                .map(jobRegistry =>
                {
                    return {
                        id: new JobRegistryId(jobRegistry.id),
                        queueName: new JobRegistryQueueName(jobRegistry.queueName),
                        state: new JobRegistryState(jobRegistry.state),
                        jobId: new JobRegistryJobId(jobRegistry.jobId),
                        jobName: new JobRegistryJobName(jobRegistry.jobName),
                        tags: new JobRegistryTags(jobRegistry.tags),
                    };
                }),
            command.cQMetadata,
        );
    }
}