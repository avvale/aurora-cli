import { ToolsAddMigrationsContextEvent, ToolsIMigrationRepository, ToolsMigration } from '@app/tools/migration';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsCreateMigrationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIMigrationRepository,
    ) {}

    async main(
        payload: {
            id: ToolsMigrationId;
            name: ToolsMigrationName;
            version: ToolsMigrationVersion;
            isActive: ToolsMigrationIsActive;
            isExecuted: ToolsMigrationIsExecuted;
            upScript: ToolsMigrationUpScript;
            downScript: ToolsMigrationDownScript;
            sort: ToolsMigrationSort;
            executedAt: ToolsMigrationExecutedAt;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const migrations = payload.map(migration => ToolsMigration.register(
            migration.id,
            migration.name,
            migration.version,
            migration.isActive,
            migration.isExecuted,
            migration.upScript,
            migration.downScript,
            migration.sort,
            migration.executedAt,
            new ToolsMigrationCreatedAt({ currentTimestamp: true }),
            new ToolsMigrationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            migrations,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddMigrationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const migrationsRegistered = this.publisher.mergeObjectContext(
            new ToolsAddMigrationsContextEvent(
                migrations,
                cQMetadata,
            ),
        );

        migrationsRegistered.created(); // apply event to model events
        migrationsRegistered.commit(); // commit all events of model
    }
}
