import {
  ToolsFindProcedureByIdQuery,
  ToolsProcedureMapper,
  ToolsProcedureResponse,
} from '@app/tools/procedure';
import { ToolsFindProcedureByIdService } from '@app/tools/procedure/application/find/tools-find-procedure-by-id.service';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindProcedureByIdQuery)
export class ToolsFindProcedureByIdQueryHandler
  implements IQueryHandler<ToolsFindProcedureByIdQuery>
{
  private readonly mapper: ToolsProcedureMapper = new ToolsProcedureMapper();

  constructor(
    private readonly findProcedureByIdService: ToolsFindProcedureByIdService,
  ) {}

  async execute(
    query: ToolsFindProcedureByIdQuery,
  ): Promise<ToolsProcedureResponse> {
    const procedure = await this.findProcedureByIdService.main(
      new ToolsProcedureId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(procedure);
  }
}
