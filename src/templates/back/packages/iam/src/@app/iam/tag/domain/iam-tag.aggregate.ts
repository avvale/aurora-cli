/* eslint-disable key-spacing */
import {
    IamCreatedTagEvent,
    IamDeletedTagEvent,
    IamUpdatedTagEvent,
} from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagRowId,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamTag extends AggregateRoot {
    id: IamTagId;
    rowId: IamTagRowId;
    name: IamTagName;
    createdAt: IamTagCreatedAt;
    updatedAt: IamTagUpdatedAt;
    deletedAt: IamTagDeletedAt;

    constructor(
        id: IamTagId,
        rowId: IamTagRowId,
        name: IamTagName,
        createdAt: IamTagCreatedAt,
        updatedAt: IamTagUpdatedAt,
        deletedAt: IamTagDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: IamTagId,
        rowId: IamTagRowId,
        name: IamTagName,
        createdAt: IamTagCreatedAt,
        updatedAt: IamTagUpdatedAt,
        deletedAt: IamTagDeletedAt,
    ): IamTag {
        return new IamTag(id, rowId, name, createdAt, updatedAt, deletedAt);
    }

    created(event: { payload: IamTag; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamCreatedTagEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: IamTag; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamUpdatedTagEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: IamTag; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamDeletedTagEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
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
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
