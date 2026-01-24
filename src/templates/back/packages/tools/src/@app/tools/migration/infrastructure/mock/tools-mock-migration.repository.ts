import {
  ToolsIMigrationRepository,
  ToolsMigration,
  toolsMockMigrationData,
} from '@app/tools/migration';
import {
  ToolsMigrationCreatedAt,
  ToolsMigrationDeletedAt,
  ToolsMigrationDownScript,
  ToolsMigrationExecutedAt,
  ToolsMigrationId,
  ToolsMigrationIsActive,
  ToolsMigrationIsExecuted,
  ToolsMigrationName,
  ToolsMigrationRowId,
  ToolsMigrationSort,
  ToolsMigrationUpdatedAt,
  ToolsMigrationUpScript,
  ToolsMigrationVersion,
} from '@app/tools/migration/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsMockMigrationRepository
  extends MockRepository<ToolsMigration>
  implements ToolsIMigrationRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'ToolsMigration';
  public collectionSource: ToolsMigration[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>toolsMockMigrationData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        ToolsMigration.register(
          new ToolsMigrationId(itemCollection.id),
          new ToolsMigrationRowId(itemCollection.rowId),
          new ToolsMigrationName(itemCollection.name),
          new ToolsMigrationVersion(itemCollection.version),
          new ToolsMigrationIsActive(itemCollection.isActive),
          new ToolsMigrationIsExecuted(itemCollection.isExecuted),
          new ToolsMigrationUpScript(itemCollection.upScript),
          new ToolsMigrationDownScript(itemCollection.downScript),
          new ToolsMigrationSort(itemCollection.sort),
          new ToolsMigrationExecutedAt(itemCollection.executedAt),
          new ToolsMigrationCreatedAt(itemCollection.createdAt),
          new ToolsMigrationUpdatedAt(itemCollection.updatedAt),
          new ToolsMigrationDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
