/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonCreatedResourceEvent,
  CommonDeletedResourceEvent,
  CommonUpdatedResourceEvent,
} from '@app/common/resource';
import {
  CommonResourceCode,
  CommonResourceCreatedAt,
  CommonResourceDeletedAt,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
  CommonResourceRowId,
  CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonResource extends AggregateRoot {
  id: CommonResourceId;
  rowId: CommonResourceRowId;
  code: CommonResourceCode;
  name: CommonResourceName;
  isActive: CommonResourceIsActive;
  hasAttachments: CommonResourceHasAttachments;
  createdAt: CommonResourceCreatedAt;
  updatedAt: CommonResourceUpdatedAt;
  deletedAt: CommonResourceDeletedAt;

  constructor(
    id: CommonResourceId,
    rowId: CommonResourceRowId,
    code: CommonResourceCode,
    name: CommonResourceName,
    isActive: CommonResourceIsActive,
    hasAttachments: CommonResourceHasAttachments,
    createdAt: CommonResourceCreatedAt,
    updatedAt: CommonResourceUpdatedAt,
    deletedAt: CommonResourceDeletedAt,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.code = code;
    this.name = name;
    this.isActive = isActive;
    this.hasAttachments = hasAttachments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: CommonResourceId,
    rowId: CommonResourceRowId,
    code: CommonResourceCode,
    name: CommonResourceName,
    isActive: CommonResourceIsActive,
    hasAttachments: CommonResourceHasAttachments,
    createdAt: CommonResourceCreatedAt,
    updatedAt: CommonResourceUpdatedAt,
    deletedAt: CommonResourceDeletedAt,
  ): CommonResource {
    return new CommonResource(
      id,
      rowId,
      code,
      name,
      isActive,
      hasAttachments,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(event: { payload: CommonResource; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonCreatedResourceEvent({
        payload: {
          id: event.payload.id.value,
          code: event.payload.code.value,
          name: event.payload.name.value,
          isActive: event.payload.isActive.value,
          hasAttachments: event.payload.hasAttachments.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: CommonResource; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonUpdatedResourceEvent({
        payload: {
          id: event.payload.id?.value,
          code: event.payload.code?.value,
          name: event.payload.name?.value,
          isActive: event.payload.isActive?.value,
          hasAttachments: event.payload.hasAttachments?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: CommonResource; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonDeletedResourceEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          code: event.payload.code.value,
          name: event.payload.name.value,
          isActive: event.payload.isActive.value,
          hasAttachments: event.payload.hasAttachments.value,
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
      code: this.code.value,
      name: this.name.value,
      isActive: this.isActive.value,
      hasAttachments: this.hasAttachments.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      code: this.code.value,
      name: this.name.value,
      isActive: this.isActive.value,
      hasAttachments: this.hasAttachments.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
