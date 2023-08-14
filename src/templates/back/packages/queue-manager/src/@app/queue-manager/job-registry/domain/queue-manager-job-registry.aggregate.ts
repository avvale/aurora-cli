/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryUpdatedAt,
    QueueManagerJobRegistryDeletedAt,
} from './value-objects';
import { QueueManagerCreatedJobRegistryEvent } from '../application/events/queue-manager-created-job-registry.event';
import { QueueManagerUpdatedJobRegistryEvent } from '../application/events/queue-manager-updated-job-registry.event';
import { QueueManagerDeletedJobRegistryEvent } from '../application/events/queue-manager-deleted-job-registry.event';

export class QueueManagerJobRegistry extends AggregateRoot
{
    id: QueueManagerJobRegistryId;
    queueName: QueueManagerJobRegistryQueueName;
    state: QueueManagerJobRegistryState;
    jobId: QueueManagerJobRegistryJobId;
    jobName: QueueManagerJobRegistryJobName;
    tags: QueueManagerJobRegistryTags;
    createdAt: QueueManagerJobRegistryCreatedAt;
    updatedAt: QueueManagerJobRegistryUpdatedAt;
    deletedAt: QueueManagerJobRegistryDeletedAt;

    // eager relationship

    constructor(
        id: QueueManagerJobRegistryId,
        queueName: QueueManagerJobRegistryQueueName,
        state: QueueManagerJobRegistryState,
        jobId: QueueManagerJobRegistryJobId,
        jobName: QueueManagerJobRegistryJobName,
        tags: QueueManagerJobRegistryTags,
        createdAt: QueueManagerJobRegistryCreatedAt,
        updatedAt: QueueManagerJobRegistryUpdatedAt,
        deletedAt: QueueManagerJobRegistryDeletedAt,

    )
    {
        super();
        this.id = id;
        this.queueName = queueName;
        this.state = state;
        this.jobId = jobId;
        this.jobName = jobName;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: QueueManagerJobRegistryId,
        queueName: QueueManagerJobRegistryQueueName,
        state: QueueManagerJobRegistryState,
        jobId: QueueManagerJobRegistryJobId,
        jobName: QueueManagerJobRegistryJobName,
        tags: QueueManagerJobRegistryTags,
        createdAt: QueueManagerJobRegistryCreatedAt,
        updatedAt: QueueManagerJobRegistryUpdatedAt,
        deletedAt: QueueManagerJobRegistryDeletedAt,

    ): QueueManagerJobRegistry
    {
        return new QueueManagerJobRegistry(
            id,
            queueName,
            state,
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
            new QueueManagerCreatedJobRegistryEvent(
                jobRegistry.id.value,
                jobRegistry.queueName.value,
                jobRegistry.state.value,
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
            new QueueManagerUpdatedJobRegistryEvent(
                jobRegistry.id?.value,
                jobRegistry.queueName?.value,
                jobRegistry.state?.value,
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
            new QueueManagerDeletedJobRegistryEvent(
                jobRegistry.id.value,
                jobRegistry.queueName.value,
                jobRegistry.state.value,
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
            state: this.state.value,
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
            state: this.state.value,
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
