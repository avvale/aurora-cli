import {
  ToolsIMigrationRepository,
  ToolsMigration,
} from '@app/tools/migration';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindMigrationByIdService {
  constructor(private readonly repository: ToolsIMigrationRepository) {}

  async main(
    id: ToolsMigrationId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<ToolsMigration> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
