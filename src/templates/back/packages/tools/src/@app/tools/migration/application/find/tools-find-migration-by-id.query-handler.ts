import { ToolsFindMigrationByIdQuery, ToolsMigrationMapper, ToolsMigrationResponse } from '@app/tools/migration';
import { ToolsFindMigrationByIdService } from '@app/tools/migration/application/find/tools-find-migration-by-id.service';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindMigrationByIdQuery)
export class ToolsFindMigrationByIdQueryHandler implements IQueryHandler<ToolsFindMigrationByIdQuery>
{
    private readonly mapper: ToolsMigrationMapper = new ToolsMigrationMapper();

    constructor(
        private readonly findMigrationByIdService: ToolsFindMigrationByIdService,
    ) {}

    async execute(query: ToolsFindMigrationByIdQuery): Promise<ToolsMigrationResponse>
    {
        const migration = await this.findMigrationByIdService.main(
            new ToolsMigrationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(migration);
    }
}
