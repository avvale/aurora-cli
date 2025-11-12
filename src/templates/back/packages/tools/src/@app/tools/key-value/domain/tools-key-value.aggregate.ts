/* eslint-disable key-spacing */
import {
    ToolsCreatedKeyValueEvent,
    ToolsDeletedKeyValueEvent,
    ToolsUpdatedKeyValueEvent,
} from '@app/tools/key-value';
import {
    ToolsKeyValueCreatedAt,
    ToolsKeyValueDeletedAt,
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueIsCached,
    ToolsKeyValueKey,
    ToolsKeyValueRowId,
    ToolsKeyValueType,
    ToolsKeyValueUpdatedAt,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsKeyValue extends AggregateRoot {
    id: ToolsKeyValueId;
    rowId: ToolsKeyValueRowId;
    key: ToolsKeyValueKey;
    type: ToolsKeyValueType;
    value: ToolsKeyValueValue;
    isCached: ToolsKeyValueIsCached;
    isActive: ToolsKeyValueIsActive;
    description: ToolsKeyValueDescription;
    createdAt: ToolsKeyValueCreatedAt;
    updatedAt: ToolsKeyValueUpdatedAt;
    deletedAt: ToolsKeyValueDeletedAt;

    constructor(
        id: ToolsKeyValueId,
        rowId: ToolsKeyValueRowId,
        key: ToolsKeyValueKey,
        type: ToolsKeyValueType,
        value: ToolsKeyValueValue,
        isCached: ToolsKeyValueIsCached,
        isActive: ToolsKeyValueIsActive,
        description: ToolsKeyValueDescription,
        createdAt: ToolsKeyValueCreatedAt,
        updatedAt: ToolsKeyValueUpdatedAt,
        deletedAt: ToolsKeyValueDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.key = key;
        this.type = type;
        this.value = value;
        this.isCached = isCached;
        this.isActive = isActive;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsKeyValueId,
        rowId: ToolsKeyValueRowId,
        key: ToolsKeyValueKey,
        type: ToolsKeyValueType,
        value: ToolsKeyValueValue,
        isCached: ToolsKeyValueIsCached,
        isActive: ToolsKeyValueIsActive,
        description: ToolsKeyValueDescription,
        createdAt: ToolsKeyValueCreatedAt,
        updatedAt: ToolsKeyValueUpdatedAt,
        deletedAt: ToolsKeyValueDeletedAt,
    ): ToolsKeyValue {
        return new ToolsKeyValue(
            id,
            rowId,
            key,
            type,
            value,
            isCached,
            isActive,
            description,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: { payload: ToolsKeyValue; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsCreatedKeyValueEvent({
                payload: {
                    id: event.payload.id.value,
                    key: event.payload.key.value,
                    type: event.payload.type.value,
                    value: event.payload.value?.value,
                    isCached: event.payload.isCached.value,
                    isActive: event.payload.isActive.value,
                    description: event.payload.description?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: ToolsKeyValue; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsUpdatedKeyValueEvent({
                payload: {
                    id: event.payload.id?.value,
                    key: event.payload.key?.value,
                    type: event.payload.type?.value,
                    value: event.payload.value?.value,
                    isCached: event.payload.isCached?.value,
                    isActive: event.payload.isActive?.value,
                    description: event.payload.description?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: ToolsKeyValue; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsDeletedKeyValueEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    key: event.payload.key.value,
                    type: event.payload.type.value,
                    value: event.payload.value?.value,
                    isCached: event.payload.isCached.value,
                    isActive: event.payload.isActive.value,
                    description: event.payload.description?.value,
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
            key: this.key.value,
            type: this.type.value,
            value: this.value?.value,
            isCached: this.isCached.value,
            isActive: this.isActive.value,
            description: this.description?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            key: this.key.value,
            type: this.type.value,
            value: this.value?.value,
            isCached: this.isCached.value,
            isActive: this.isActive.value,
            description: this.description?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
