import {
  ToolsCreatedMigrationEvent,
  ToolsCreatedMigrationsEvent,
  ToolsDeletedMigrationEvent,
  ToolsDeletedMigrationsEvent,
  ToolsMigration,
  ToolsUpdatedMigrationEvent,
  ToolsUpdatedMigrationsEvent,
} from '@app/tools/migration';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsAddMigrationsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: ToolsMigration[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new ToolsCreatedMigrationsEvent({
        payload: this.aggregateRoots.map(
          (migration) =>
            new ToolsCreatedMigrationEvent({
              payload: {
                id: migration.id.value,
                name: migration.name.value,
                version: migration.version.value,
                isActive: migration.isActive.value,
                isExecuted: migration.isExecuted.value,
                upScript: migration.upScript?.value,
                downScript: migration.downScript?.value,
                sort: migration.sort?.value,
                executedAt: migration.executedAt?.value,
                createdAt: migration.createdAt?.value,
                updatedAt: migration.updatedAt?.value,
                deletedAt: migration.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new ToolsUpdatedMigrationsEvent({
        payload: this.aggregateRoots.map(
          (migration) =>
            new ToolsUpdatedMigrationEvent({
              payload: {
                id: migration.id.value,
                name: migration.name.value,
                version: migration.version.value,
                isActive: migration.isActive.value,
                isExecuted: migration.isExecuted.value,
                upScript: migration.upScript?.value,
                downScript: migration.downScript?.value,
                sort: migration.sort?.value,
                executedAt: migration.executedAt?.value,
                createdAt: migration.createdAt?.value,
                updatedAt: migration.updatedAt?.value,
                deletedAt: migration.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new ToolsDeletedMigrationsEvent({
        payload: this.aggregateRoots.map(
          (migration) =>
            new ToolsDeletedMigrationEvent({
              payload: {
                id: migration.id.value,
                rowId: migration.rowId.value,
                name: migration.name.value,
                version: migration.version.value,
                isActive: migration.isActive.value,
                isExecuted: migration.isExecuted.value,
                upScript: migration.upScript?.value,
                downScript: migration.downScript?.value,
                sort: migration.sort?.value,
                executedAt: migration.executedAt?.value,
                createdAt: migration.createdAt?.value,
                updatedAt: migration.updatedAt?.value,
                deletedAt: migration.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
