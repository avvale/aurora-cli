import { ToolsFindProcedureQuery, ToolsProcedureMapper, ToolsProcedureResponse } from '@app/tools/procedure';
import { ToolsFindProcedureService } from '@app/tools/procedure/application/find/tools-find-procedure.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindProcedureQuery)
export class ToolsFindProcedureQueryHandler implements IQueryHandler<ToolsFindProcedureQuery>
{
    private readonly mapper: ToolsProcedureMapper = new ToolsProcedureMapper();

    constructor(
        private readonly findProcedureService: ToolsFindProcedureService,
    ) {}

    async execute(query: ToolsFindProcedureQuery): Promise<ToolsProcedureResponse>
    {
        const procedure = await this.findProcedureService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(procedure);
    }
}
