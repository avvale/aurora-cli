import { ToolsFindMigrationQuery, ToolsMigrationMapper, ToolsMigrationResponse } from '@app/tools/migration';
import { ToolsFindMigrationService } from '@app/tools/migration/application/find/tools-find-migration.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindMigrationQuery)
export class ToolsFindMigrationQueryHandler implements IQueryHandler<ToolsFindMigrationQuery>
{
    private readonly mapper: ToolsMigrationMapper = new ToolsMigrationMapper();

    constructor(
        private readonly findMigrationService: ToolsFindMigrationService,
    ) {}

    async execute(query: ToolsFindMigrationQuery): Promise<ToolsMigrationResponse>
    {
        const migration = await this.findMigrationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(migration);
    }
}
