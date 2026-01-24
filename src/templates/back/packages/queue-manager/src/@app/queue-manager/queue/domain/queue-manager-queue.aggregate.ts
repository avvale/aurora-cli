/* eslint-disable key-spacing */
import {
  QueueManagerCreatedQueueEvent,
  QueueManagerDeletedQueueEvent,
  QueueManagerUpdatedQueueEvent,
} from '@app/queue-manager/queue';
import {
  QueueManagerQueueCreatedAt,
  QueueManagerQueueDeletedAt,
  QueueManagerQueueId,
  QueueManagerQueueName,
  QueueManagerQueuePrefix,
  QueueManagerQueueRowId,
  QueueManagerQueueUpdatedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class QueueManagerQueue extends AggregateRoot {
  id: QueueManagerQueueId;
  rowId: QueueManagerQueueRowId;
  prefix: QueueManagerQueuePrefix;
  name: QueueManagerQueueName;
  createdAt: QueueManagerQueueCreatedAt;
  updatedAt: QueueManagerQueueUpdatedAt;
  deletedAt: QueueManagerQueueDeletedAt;

  constructor(
    id: QueueManagerQueueId,
    rowId: QueueManagerQueueRowId,
    prefix: QueueManagerQueuePrefix,
    name: QueueManagerQueueName,
    createdAt: QueueManagerQueueCreatedAt,
    updatedAt: QueueManagerQueueUpdatedAt,
    deletedAt: QueueManagerQueueDeletedAt,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.prefix = prefix;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: QueueManagerQueueId,
    rowId: QueueManagerQueueRowId,
    prefix: QueueManagerQueuePrefix,
    name: QueueManagerQueueName,
    createdAt: QueueManagerQueueCreatedAt,
    updatedAt: QueueManagerQueueUpdatedAt,
    deletedAt: QueueManagerQueueDeletedAt,
  ): QueueManagerQueue {
    return new QueueManagerQueue(
      id,
      rowId,
      prefix,
      name,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(event: {
    payload: QueueManagerQueue;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new QueueManagerCreatedQueueEvent({
        payload: {
          id: event.payload.id.value,
          prefix: event.payload.prefix.value,
          name: event.payload.name.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: {
    payload: QueueManagerQueue;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new QueueManagerUpdatedQueueEvent({
        payload: {
          id: event.payload.id?.value,
          prefix: event.payload.prefix?.value,
          name: event.payload.name?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: {
    payload: QueueManagerQueue;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new QueueManagerDeletedQueueEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          prefix: event.payload.prefix.value,
          name: event.payload.name.value,
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
      prefix: this.prefix.value,
      name: this.name.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      prefix: this.prefix.value,
      name: this.name.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
