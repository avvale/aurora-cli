import {
    ToolsAddMigrationsContextEvent,
    ToolsIMigrationRepository,
    ToolsMigration,
} from '@app/tools/migration';
import {
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsUpdateMigrationsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIMigrationRepository,
    ) {}

    async main(
        payload: {
            id?: ToolsMigrationId;
            name?: ToolsMigrationName;
            version?: ToolsMigrationVersion;
            isActive?: ToolsMigrationIsActive;
            isExecuted?: ToolsMigrationIsExecuted;
            upScript?: ToolsMigrationUpScript;
            downScript?: ToolsMigrationDownScript;
            sort?: ToolsMigrationSort;
            executedAt?: ToolsMigrationExecutedAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new ToolsMigrationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(migration, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const migrations = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const migrationsRegister = this.publisher.mergeObjectContext(
            new ToolsAddMigrationsContextEvent(migrations, cQMetadata),
        );

        migrationsRegister.updated(); // apply event to model events
        migrationsRegister.commit(); // commit all events of model
    }
}
