import { ToolsGetProceduresQuery, ToolsProcedureMapper, ToolsProcedureResponse } from '@app/tools/procedure';
import { ToolsGetProceduresService } from '@app/tools/procedure/application/get/tools-get-procedures.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetProceduresQuery)
export class ToolsGetProceduresQueryHandler implements IQueryHandler<ToolsGetProceduresQuery>
{
    private readonly mapper: ToolsProcedureMapper = new ToolsProcedureMapper();

    constructor(
        private readonly getProceduresService: ToolsGetProceduresService,
    ) {}

    async execute(query: ToolsGetProceduresQuery): Promise<ToolsProcedureResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getProceduresService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
