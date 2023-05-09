/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobRegistryByIdCommand } from './update-job-registry-by-id.command';
import { UpdateJobRegistryByIdService } from './update-job-registry-by-id.service';
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

@CommandHandler(UpdateJobRegistryByIdCommand)
export class UpdateJobRegistryByIdCommandHandler implements ICommandHandler<UpdateJobRegistryByIdCommand>
{
    constructor(
        private readonly updateJobRegistryByIdService: UpdateJobRegistryByIdService,
    ) {}

    async execute(command: UpdateJobRegistryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobRegistryByIdService.main(
            {
                id: new JobRegistryId(command.payload.id),
                queueName: new JobRegistryQueueName(command.payload.queueName, { undefinable: true }),
                jobId: new JobRegistryJobId(command.payload.jobId, { undefinable: true }),
                jobName: new JobRegistryJobName(command.payload.jobName),
                tags: new JobRegistryTags(command.payload.tags),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}