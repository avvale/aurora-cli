import { ToolsPaginateProceduresQuery } from '@app/tools/procedure';
import { ToolsPaginateProceduresService } from '@app/tools/procedure/application/paginate/tools-paginate-procedures.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsPaginateProceduresQuery)
export class ToolsPaginateProceduresQueryHandler implements IQueryHandler<ToolsPaginateProceduresQuery>
{
    constructor(
        private readonly paginateProceduresService: ToolsPaginateProceduresService,
    ) {}

    async execute(query: ToolsPaginateProceduresQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateProceduresService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
