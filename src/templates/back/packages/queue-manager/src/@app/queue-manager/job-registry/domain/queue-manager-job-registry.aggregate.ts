/* eslint-disable key-spacing */
import {
    QueueManagerCreatedJobRegistryEvent,
    QueueManagerDeletedJobRegistryEvent,
    QueueManagerUpdatedJobRegistryEvent,
} from '@app/queue-manager/job-registry';
import {
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryDeletedAt,
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryRowId,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryUpdatedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class QueueManagerJobRegistry extends AggregateRoot {
    id: QueueManagerJobRegistryId;
    rowId: QueueManagerJobRegistryRowId;
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
        rowId: QueueManagerJobRegistryRowId,
        queueName: QueueManagerJobRegistryQueueName,
        state: QueueManagerJobRegistryState,
        jobId: QueueManagerJobRegistryJobId,
        jobName: QueueManagerJobRegistryJobName,
        tags: QueueManagerJobRegistryTags,
        createdAt: QueueManagerJobRegistryCreatedAt,
        updatedAt: QueueManagerJobRegistryUpdatedAt,
        deletedAt: QueueManagerJobRegistryDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
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
        rowId: QueueManagerJobRegistryRowId,
        queueName: QueueManagerJobRegistryQueueName,
        state: QueueManagerJobRegistryState,
        jobId: QueueManagerJobRegistryJobId,
        jobName: QueueManagerJobRegistryJobName,
        tags: QueueManagerJobRegistryTags,
        createdAt: QueueManagerJobRegistryCreatedAt,
        updatedAt: QueueManagerJobRegistryUpdatedAt,
        deletedAt: QueueManagerJobRegistryDeletedAt,
    ): QueueManagerJobRegistry {
        return new QueueManagerJobRegistry(
            id,
            rowId,
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

    created(event: {
        payload: QueueManagerJobRegistry;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new QueueManagerCreatedJobRegistryEvent({
                payload: {
                    id: event.payload.id.value,
                    queueName: event.payload.queueName.value,
                    state: event.payload.state.value,
                    jobId: event.payload.jobId.value,
                    jobName: event.payload.jobName?.value,
                    tags: event.payload.tags?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: {
        payload: QueueManagerJobRegistry;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new QueueManagerUpdatedJobRegistryEvent({
                payload: {
                    id: event.payload.id?.value,
                    queueName: event.payload.queueName?.value,
                    state: event.payload.state?.value,
                    jobId: event.payload.jobId?.value,
                    jobName: event.payload.jobName?.value,
                    tags: event.payload.tags?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: {
        payload: QueueManagerJobRegistry;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new QueueManagerDeletedJobRegistryEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    queueName: event.payload.queueName.value,
                    state: event.payload.state.value,
                    jobId: event.payload.jobId.value,
                    jobName: event.payload.jobName?.value,
                    tags: event.payload.tags?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            id: this.id.value,
            rowId: this.rowId.value,
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
    toRepository(): LiteralObject {
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
