/* eslint-disable key-spacing */
import {
    ToolsCreatedProcedureEvent,
    ToolsDeletedProcedureEvent,
    ToolsUpdatedProcedureEvent,
} from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureHash,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsExecuted,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureRowId,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsProcedure extends AggregateRoot {
    id: ToolsProcedureId;
    rowId: ToolsProcedureRowId;
    name: ToolsProcedureName;
    type: ToolsProcedureType;
    version: ToolsProcedureVersion;
    isActive: ToolsProcedureIsActive;
    isExecuted: ToolsProcedureIsExecuted;
    isUpdated: ToolsProcedureIsUpdated;
    upScript: ToolsProcedureUpScript;
    downScript: ToolsProcedureDownScript;
    sort: ToolsProcedureSort;
    hash: ToolsProcedureHash;
    executedAt: ToolsProcedureExecutedAt;
    checkedAt: ToolsProcedureCheckedAt;
    createdAt: ToolsProcedureCreatedAt;
    updatedAt: ToolsProcedureUpdatedAt;
    deletedAt: ToolsProcedureDeletedAt;

    constructor(
        id: ToolsProcedureId,
        rowId: ToolsProcedureRowId,
        name: ToolsProcedureName,
        type: ToolsProcedureType,
        version: ToolsProcedureVersion,
        isActive: ToolsProcedureIsActive,
        isExecuted: ToolsProcedureIsExecuted,
        isUpdated: ToolsProcedureIsUpdated,
        upScript: ToolsProcedureUpScript,
        downScript: ToolsProcedureDownScript,
        sort: ToolsProcedureSort,
        hash: ToolsProcedureHash,
        executedAt: ToolsProcedureExecutedAt,
        checkedAt: ToolsProcedureCheckedAt,
        createdAt: ToolsProcedureCreatedAt,
        updatedAt: ToolsProcedureUpdatedAt,
        deletedAt: ToolsProcedureDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.name = name;
        this.type = type;
        this.version = version;
        this.isActive = isActive;
        this.isExecuted = isExecuted;
        this.isUpdated = isUpdated;
        this.upScript = upScript;
        this.downScript = downScript;
        this.sort = sort;
        this.hash = hash;
        this.executedAt = executedAt;
        this.checkedAt = checkedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsProcedureId,
        rowId: ToolsProcedureRowId,
        name: ToolsProcedureName,
        type: ToolsProcedureType,
        version: ToolsProcedureVersion,
        isActive: ToolsProcedureIsActive,
        isExecuted: ToolsProcedureIsExecuted,
        isUpdated: ToolsProcedureIsUpdated,
        upScript: ToolsProcedureUpScript,
        downScript: ToolsProcedureDownScript,
        sort: ToolsProcedureSort,
        hash: ToolsProcedureHash,
        executedAt: ToolsProcedureExecutedAt,
        checkedAt: ToolsProcedureCheckedAt,
        createdAt: ToolsProcedureCreatedAt,
        updatedAt: ToolsProcedureUpdatedAt,
        deletedAt: ToolsProcedureDeletedAt,
    ): ToolsProcedure {
        return new ToolsProcedure(
            id,
            rowId,
            name,
            type,
            version,
            isActive,
            isExecuted,
            isUpdated,
            upScript,
            downScript,
            sort,
            hash,
            executedAt,
            checkedAt,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: { payload: ToolsProcedure; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsCreatedProcedureEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    type: event.payload.type.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isExecuted: event.payload.isExecuted.value,
                    isUpdated: event.payload.isUpdated.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    hash: event.payload.hash?.value,
                    executedAt: event.payload.executedAt?.value,
                    checkedAt: event.payload.checkedAt?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: ToolsProcedure; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsUpdatedProcedureEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    type: event.payload.type?.value,
                    version: event.payload.version?.value,
                    isActive: event.payload.isActive?.value,
                    isExecuted: event.payload.isExecuted?.value,
                    isUpdated: event.payload.isUpdated?.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    hash: event.payload.hash?.value,
                    executedAt: event.payload.executedAt?.value,
                    checkedAt: event.payload.checkedAt?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: ToolsProcedure; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsDeletedProcedureEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    name: event.payload.name.value,
                    type: event.payload.type.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isExecuted: event.payload.isExecuted.value,
                    isUpdated: event.payload.isUpdated.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    hash: event.payload.hash?.value,
                    executedAt: event.payload.executedAt?.value,
                    checkedAt: event.payload.checkedAt?.value,
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
            type: this.type.value,
            version: this.version.value,
            isActive: this.isActive.value,
            isExecuted: this.isExecuted.value,
            isUpdated: this.isUpdated.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            hash: this.hash?.value,
            executedAt: this.executedAt?.value,
            checkedAt: this.checkedAt?.value,
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
            type: this.type.value,
            version: this.version.value,
            isActive: this.isActive.value,
            isExecuted: this.isExecuted.value,
            isUpdated: this.isUpdated.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            hash: this.hash?.value,
            executedAt: this.executedAt?.value,
            checkedAt: this.checkedAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
