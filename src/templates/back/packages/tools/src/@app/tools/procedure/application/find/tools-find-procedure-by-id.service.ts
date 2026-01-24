import {
  ToolsIProcedureRepository,
  ToolsProcedure,
} from '@app/tools/procedure';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindProcedureByIdService {
  constructor(private readonly repository: ToolsIProcedureRepository) {}

  async main(
    id: ToolsProcedureId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<ToolsProcedure> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
