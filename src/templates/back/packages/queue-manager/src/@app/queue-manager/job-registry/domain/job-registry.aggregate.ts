/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from './value-objects';
import { CreatedJobRegistryEvent } from '../application/events/created-job-registry.event';
import { UpdatedJobRegistryEvent } from '../application/events/updated-job-registry.event';
import { DeletedJobRegistryEvent } from '../application/events/deleted-job-registry.event';

export class QueueManagerJobRegistry extends AggregateRoot
{
    id: JobRegistryId;
    queueName: JobRegistryQueueName;
    jobId: JobRegistryJobId;
    jobName: JobRegistryJobName;
    tags: JobRegistryTags;
    createdAt: JobRegistryCreatedAt;
    updatedAt: JobRegistryUpdatedAt;
    deletedAt: JobRegistryDeletedAt;

    // eager relationship

    constructor(
        id: JobRegistryId,
        queueName: JobRegistryQueueName,
        jobId: JobRegistryJobId,
        jobName: JobRegistryJobName,
        tags: JobRegistryTags,
        createdAt: JobRegistryCreatedAt,
        updatedAt: JobRegistryUpdatedAt,
        deletedAt: JobRegistryDeletedAt,

    )
    {
        super();
        this.id = id;
        this.queueName = queueName;
        this.jobId = jobId;
        this.jobName = jobName;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: JobRegistryId,
        queueName: JobRegistryQueueName,
        jobId: JobRegistryJobId,
        jobName: JobRegistryJobName,
        tags: JobRegistryTags,
        createdAt: JobRegistryCreatedAt,
        updatedAt: JobRegistryUpdatedAt,
        deletedAt: JobRegistryDeletedAt,

    ): QueueManagerJobRegistry
    {
        return new QueueManagerJobRegistry(
            id,
            queueName,
            jobId,
            jobName,
            tags,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(jobRegistry: QueueManagerJobRegistry): void
    {
        this.apply(
            new CreatedJobRegistryEvent(
                jobRegistry.id.value,
                jobRegistry.queueName.value,
                jobRegistry.jobId.value,
                jobRegistry.jobName?.value,
                jobRegistry.tags?.value,
                jobRegistry.createdAt?.value,
                jobRegistry.updatedAt?.value,
                jobRegistry.deletedAt?.value,
            ),
        );
    }

    updated(jobRegistry: QueueManagerJobRegistry): void
    {
        this.apply(
            new UpdatedJobRegistryEvent(
                jobRegistry.id?.value,
                jobRegistry.queueName?.value,
                jobRegistry.jobId?.value,
                jobRegistry.jobName?.value,
                jobRegistry.tags?.value,
                jobRegistry.createdAt?.value,
                jobRegistry.updatedAt?.value,
                jobRegistry.deletedAt?.value,
            ),
        );
    }

    deleted(jobRegistry: QueueManagerJobRegistry): void
    {
        this.apply(
            new DeletedJobRegistryEvent(
                jobRegistry.id.value,
                jobRegistry.queueName.value,
                jobRegistry.jobId.value,
                jobRegistry.jobName?.value,
                jobRegistry.tags?.value,
                jobRegistry.createdAt?.value,
                jobRegistry.updatedAt?.value,
                jobRegistry.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            queueName: this.queueName.value,
            jobId: this.jobId.value,
            jobName: this.jobName?.value,
            tags: this.tags?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            queueName: this.queueName.value,
            jobId: this.jobId.value,
            jobName: this.jobName?.value,
            tags: this.tags?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
