import { ToolsMigration, ToolsMigrationResponse } from '@app/tools/migration';
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
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class ToolsMigrationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param migration
     */
    mapModelToAggregate(migration: LiteralObject, cQMetadata?: CQMetadata): ToolsMigration
    {
        if (!migration) return;

        return this.makeAggregate(migration, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param migrations
     */
    mapModelsToAggregates(migrations: LiteralObject[], cQMetadata?: CQMetadata): ToolsMigration[]
    {
        if (!Array.isArray(migrations)) return;

        return migrations.map(migration => this.makeAggregate(migration, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param migration
     */
    mapAggregateToResponse(migration: ToolsMigration): ToolsMigrationResponse
    {
        return this.makeResponse(migration);
    }

    /**
     * Map array of aggregates to array responses
     * @param migrations
     */
    mapAggregatesToResponses(migrations: ToolsMigration[]): ToolsMigrationResponse[]
    {
        if (!Array.isArray(migrations)) return;

        return migrations.map(migration => this.makeResponse(migration));
    }

    private makeAggregate(migration: LiteralObject, cQMetadata?: CQMetadata): ToolsMigration
    {
        return ToolsMigration.register(
            new ToolsMigrationId(migration.id, { undefinable: true }),
            new ToolsMigrationName(migration.name, { undefinable: true }),
            new ToolsMigrationVersion(migration.version, { undefinable: true }),
            new ToolsMigrationIsActive(migration.isActive, { undefinable: true }),
            new ToolsMigrationIsExecuted(migration.isExecuted, { undefinable: true }),
            new ToolsMigrationUpScript(migration.upScript, { undefinable: true }),
            new ToolsMigrationDownScript(migration.downScript, { undefinable: true }),
            new ToolsMigrationSort(migration.sort, { undefinable: true }),
            new ToolsMigrationExecutedAt(migration.executedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ToolsMigrationCreatedAt(migration.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ToolsMigrationUpdatedAt(migration.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ToolsMigrationDeletedAt(migration.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(migration: ToolsMigration): ToolsMigrationResponse
    {
        if (!migration) return;

        return new ToolsMigrationResponse(
            migration.id.value,
            migration.name.value,
            migration.version.value,
            migration.isActive.value,
            migration.isExecuted.value,
            migration.upScript.value,
            migration.downScript.value,
            migration.sort.value,
            migration.executedAt.value,
            migration.createdAt.value,
            migration.updatedAt.value,
            migration.deletedAt.value,
        );
    }
}
