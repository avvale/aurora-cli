/* eslint-disable key-spacing */
import { ToolsCreatedProcedureEvent, ToolsDeletedProcedureEvent, ToolsUpdatedProcedureEvent } from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsInstalled,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsProcedure extends AggregateRoot
{
    id: ToolsProcedureId;
    name: ToolsProcedureName;
    type: ToolsProcedureType;
    version: ToolsProcedureVersion;
    isActive: ToolsProcedureIsActive;
    isInstalled: ToolsProcedureIsInstalled;
    isUpdated: ToolsProcedureIsUpdated;
    upScript: ToolsProcedureUpScript;
    downScript: ToolsProcedureDownScript;
    sort: ToolsProcedureSort;
    executedAt: ToolsProcedureExecutedAt;
    checkedAt: ToolsProcedureCheckedAt;
    createdAt: ToolsProcedureCreatedAt;
    updatedAt: ToolsProcedureUpdatedAt;
    deletedAt: ToolsProcedureDeletedAt;

    constructor(
        id: ToolsProcedureId,
        name: ToolsProcedureName,
        type: ToolsProcedureType,
        version: ToolsProcedureVersion,
        isActive: ToolsProcedureIsActive,
        isInstalled: ToolsProcedureIsInstalled,
        isUpdated: ToolsProcedureIsUpdated,
        upScript: ToolsProcedureUpScript,
        downScript: ToolsProcedureDownScript,
        sort: ToolsProcedureSort,
        executedAt: ToolsProcedureExecutedAt,
        checkedAt: ToolsProcedureCheckedAt,
        createdAt: ToolsProcedureCreatedAt,
        updatedAt: ToolsProcedureUpdatedAt,
        deletedAt: ToolsProcedureDeletedAt,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.version = version;
        this.isActive = isActive;
        this.isInstalled = isInstalled;
        this.isUpdated = isUpdated;
        this.upScript = upScript;
        this.downScript = downScript;
        this.sort = sort;
        this.executedAt = executedAt;
        this.checkedAt = checkedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsProcedureId,
        name: ToolsProcedureName,
        type: ToolsProcedureType,
        version: ToolsProcedureVersion,
        isActive: ToolsProcedureIsActive,
        isInstalled: ToolsProcedureIsInstalled,
        isUpdated: ToolsProcedureIsUpdated,
        upScript: ToolsProcedureUpScript,
        downScript: ToolsProcedureDownScript,
        sort: ToolsProcedureSort,
        executedAt: ToolsProcedureExecutedAt,
        checkedAt: ToolsProcedureCheckedAt,
        createdAt: ToolsProcedureCreatedAt,
        updatedAt: ToolsProcedureUpdatedAt,
        deletedAt: ToolsProcedureDeletedAt,
    ): ToolsProcedure
    {
        return new ToolsProcedure(
            id,
            name,
            type,
            version,
            isActive,
            isInstalled,
            isUpdated,
            upScript,
            downScript,
            sort,
            executedAt,
            checkedAt,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(
        event: {
            payload: ToolsProcedure;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsCreatedProcedureEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    type: event.payload.type.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isInstalled: event.payload.isInstalled.value,
                    isUpdated: event.payload.isUpdated.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
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

    updated(
        event: {
            payload: ToolsProcedure;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsUpdatedProcedureEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    type: event.payload.type?.value,
                    version: event.payload.version?.value,
                    isActive: event.payload.isActive?.value,
                    isInstalled: event.payload.isInstalled?.value,
                    isUpdated: event.payload.isUpdated?.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
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

    deleted(
        event: {
            payload: ToolsProcedure;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsDeletedProcedureEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    type: event.payload.type.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isInstalled: event.payload.isInstalled.value,
                    isUpdated: event.payload.isUpdated.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
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

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            type: this.type.value,
            version: this.version.value,
            isActive: this.isActive.value,
            isInstalled: this.isInstalled.value,
            isUpdated: this.isUpdated.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            executedAt: this.executedAt?.value,
            checkedAt: this.checkedAt?.value,
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
            name: this.name.value,
            type: this.type.value,
            version: this.version.value,
            isActive: this.isActive.value,
            isInstalled: this.isInstalled.value,
            isUpdated: this.isUpdated.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            executedAt: this.executedAt?.value,
            checkedAt: this.checkedAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
