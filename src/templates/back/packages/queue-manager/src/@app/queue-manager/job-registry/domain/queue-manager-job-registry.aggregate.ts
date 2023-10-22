/* eslint-disable key-spacing */
import { QueueManagerCreatedJobRegistryEvent, QueueManagerDeletedJobRegistryEvent, QueueManagerUpdatedJobRegistryEvent } from '@app/queue-manager/job-registry';
import {
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryDeletedAt,
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryUpdatedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

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
    }

    static register(
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
        };
    }
}
