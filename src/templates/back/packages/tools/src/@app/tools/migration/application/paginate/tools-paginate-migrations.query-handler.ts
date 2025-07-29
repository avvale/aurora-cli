import { ToolsPaginateMigrationsQuery } from '@app/tools/migration';
import { ToolsPaginateMigrationsService } from '@app/tools/migration/application/paginate/tools-paginate-migrations.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsPaginateMigrationsQuery)
export class ToolsPaginateMigrationsQueryHandler implements IQueryHandler<ToolsPaginateMigrationsQuery>
{
    constructor(
        private readonly paginateMigrationsService: ToolsPaginateMigrationsService,
    ) {}

    async execute(query: ToolsPaginateMigrationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateMigrationsService.main(
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
