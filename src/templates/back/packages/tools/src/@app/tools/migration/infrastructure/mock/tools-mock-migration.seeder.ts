import { ToolsMigration, toolsMockMigrationData } from '@app/tools/migration';
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ToolsMockMigrationSeeder extends MockSeeder<ToolsMigration>
{
    public collectionSource: ToolsMigration[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const migration of _.orderBy(toolsMockMigrationData, ['id']))
        {
            this.collectionSource.push(
                ToolsMigration.register(
                    new ToolsMigrationId(migration.id),
                    new ToolsMigrationName(migration.name),
                    new ToolsMigrationVersion(migration.version),
                    new ToolsMigrationIsActive(migration.isActive),
                    new ToolsMigrationIsExecuted(migration.isExecuted),
                    new ToolsMigrationUpScript(migration.upScript),
                    new ToolsMigrationDownScript(migration.downScript),
                    new ToolsMigrationSort(migration.sort),
                    new ToolsMigrationExecutedAt(migration.executedAt),
                    new ToolsMigrationCreatedAt({ currentTimestamp: true }),
                    new ToolsMigrationUpdatedAt({ currentTimestamp: true }),
                    new ToolsMigrationDeletedAt(null),
                ),
            );
        }
    }
}
