import {
  ToolsAddMigrationsContextEvent,
  ToolsIMigrationRepository,
} from '@app/tools/migration';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteMigrationsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ToolsIMigrationRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const migrations = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (migrations.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddMigrationsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const migrationsRegistered = this.publisher.mergeObjectContext(
      new ToolsAddMigrationsContextEvent(migrations, cQMetadata),
    );

    migrationsRegistered.deleted(); // apply event to model events
    migrationsRegistered.commit(); // commit all events of model
  }
}
