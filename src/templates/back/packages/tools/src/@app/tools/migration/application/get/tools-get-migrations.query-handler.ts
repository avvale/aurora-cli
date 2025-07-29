import { ToolsGetMigrationsQuery, ToolsMigrationMapper, ToolsMigrationResponse } from '@app/tools/migration';
import { ToolsGetMigrationsService } from '@app/tools/migration/application/get/tools-get-migrations.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetMigrationsQuery)
export class ToolsGetMigrationsQueryHandler implements IQueryHandler<ToolsGetMigrationsQuery>
{
    private readonly mapper: ToolsMigrationMapper = new ToolsMigrationMapper();

    constructor(
        private readonly getMigrationsService: ToolsGetMigrationsService,
    ) {}

    async execute(query: ToolsGetMigrationsQuery): Promise<ToolsMigrationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getMigrationsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
