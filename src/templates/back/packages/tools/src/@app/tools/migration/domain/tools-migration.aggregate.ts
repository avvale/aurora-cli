/* eslint-disable key-spacing */
import { ToolsCreatedMigrationEvent, ToolsDeletedMigrationEvent, ToolsUpdatedMigrationEvent } from '@app/tools/migration';
import {
    ToolsMigrationCreatedAt,
    ToolsMigrationDeletedAt,
    ToolsMigrationDownScript,
    ToolsMigrationExecutedAt,
    ToolsMigrationId,
    ToolsMigrationIsActive,
    ToolsMigrationIsExecuted,
    ToolsMigrationName,
    ToolsMigrationSort,
    ToolsMigrationUpdatedAt,
    ToolsMigrationUpScript,
    ToolsMigrationVersion,
} from '@app/tools/migration/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsMigration extends AggregateRoot
{
    id: ToolsMigrationId;
    name: ToolsMigrationName;
    version: ToolsMigrationVersion;
    isActive: ToolsMigrationIsActive;
    isExecuted: ToolsMigrationIsExecuted;
    upScript: ToolsMigrationUpScript;
    downScript: ToolsMigrationDownScript;
    sort: ToolsMigrationSort;
    executedAt: ToolsMigrationExecutedAt;
    createdAt: ToolsMigrationCreatedAt;
    updatedAt: ToolsMigrationUpdatedAt;
    deletedAt: ToolsMigrationDeletedAt;

    constructor(
        id: ToolsMigrationId,
        name: ToolsMigrationName,
        version: ToolsMigrationVersion,
        isActive: ToolsMigrationIsActive,
        isExecuted: ToolsMigrationIsExecuted,
        upScript: ToolsMigrationUpScript,
        downScript: ToolsMigrationDownScript,
        sort: ToolsMigrationSort,
        executedAt: ToolsMigrationExecutedAt,
        createdAt: ToolsMigrationCreatedAt,
        updatedAt: ToolsMigrationUpdatedAt,
        deletedAt: ToolsMigrationDeletedAt,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.version = version;
        this.isActive = isActive;
        this.isExecuted = isExecuted;
        this.upScript = upScript;
        this.downScript = downScript;
        this.sort = sort;
        this.executedAt = executedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsMigrationId,
        name: ToolsMigrationName,
        version: ToolsMigrationVersion,
        isActive: ToolsMigrationIsActive,
        isExecuted: ToolsMigrationIsExecuted,
        upScript: ToolsMigrationUpScript,
        downScript: ToolsMigrationDownScript,
        sort: ToolsMigrationSort,
        executedAt: ToolsMigrationExecutedAt,
        createdAt: ToolsMigrationCreatedAt,
        updatedAt: ToolsMigrationUpdatedAt,
        deletedAt: ToolsMigrationDeletedAt,
    ): ToolsMigration
    {
        return new ToolsMigration(
            id,
            name,
            version,
            isActive,
            isExecuted,
            upScript,
            downScript,
            sort,
            executedAt,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(
        event: {
            payload: ToolsMigration;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsCreatedMigrationEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isExecuted: event.payload.isExecuted.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    executedAt: event.payload.executedAt?.value,
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
            payload: ToolsMigration;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsUpdatedMigrationEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    version: event.payload.version?.value,
                    isActive: event.payload.isActive?.value,
                    isExecuted: event.payload.isExecuted?.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    executedAt: event.payload.executedAt?.value,
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
            payload: ToolsMigration;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new ToolsDeletedMigrationEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    version: event.payload.version.value,
                    isActive: event.payload.isActive.value,
                    isExecuted: event.payload.isExecuted.value,
                    upScript: event.payload.upScript?.value,
                    downScript: event.payload.downScript?.value,
                    sort: event.payload.sort?.value,
                    executedAt: event.payload.executedAt?.value,
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
            version: this.version.value,
            isActive: this.isActive.value,
            isExecuted: this.isExecuted.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            executedAt: this.executedAt?.value,
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
            version: this.version.value,
            isActive: this.isActive.value,
            isExecuted: this.isExecuted.value,
            upScript: this.upScript?.value,
            downScript: this.downScript?.value,
            sort: this.sort?.value,
            executedAt: this.executedAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
