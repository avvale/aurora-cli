import {
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
export class ToolsUpdateMigrationByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIMigrationRepository,
    ) {}

    async main(
        payload: {
            id: ToolsMigrationId;
            name?: ToolsMigrationName;
            version?: ToolsMigrationVersion;
            isActive?: ToolsMigrationIsActive;
            isExecuted?: ToolsMigrationIsExecuted;
            upScript?: ToolsMigrationUpScript;
            downScript?: ToolsMigrationDownScript;
            sort?: ToolsMigrationSort;
            executedAt?: ToolsMigrationExecutedAt;
        },
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

        // update by id
        await this.repository.updateById(migration, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const migrationRegister = this.publisher.mergeObjectContext(migration);

        migrationRegister.updated({
            payload: migration,
            cQMetadata,
        }); // apply event to model events
        migrationRegister.commit(); // commit all events of model
    }
}
