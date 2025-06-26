import { ToolsPaginateKeyValuesQuery } from '@app/tools/key-value';
import { ToolsPaginateKeyValuesService } from '@app/tools/key-value/application/paginate/tools-paginate-key-values.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsPaginateKeyValuesQuery)
export class ToolsPaginateKeyValuesQueryHandler implements IQueryHandler<ToolsPaginateKeyValuesQuery>
{
    constructor(
        private readonly paginateKeyValuesService: ToolsPaginateKeyValuesService,
    ) {}

    async execute(query: ToolsPaginateKeyValuesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateKeyValuesService.main(
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
