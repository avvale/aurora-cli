import {
    ToolsIMigrationRepository,
    ToolsMigration,
} from '@app/tools/migration';
import {
    ToolsMigrationCreatedAt,
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
export class ToolsCreateMigrationService {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const migration = ToolsMigration.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.version,
            payload.isActive,
            payload.isExecuted,
            payload.upScript,
            payload.downScript,
            payload.sort,
            payload.executedAt,
            new ToolsMigrationCreatedAt({ currentTimestamp: true }),
            new ToolsMigrationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(migration, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const migrationRegister = this.publisher.mergeObjectContext(migration);

        migrationRegister.created({
            payload: migration,
            cQMetadata,
        }); // apply event to model events
        migrationRegister.commit(); // commit all events of model
    }
}
