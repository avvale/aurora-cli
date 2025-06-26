import { ToolsInformationSchemaMapper, ToolsInformationSchemaResponse, ToolsRawSQLInformationSchemasQuery } from '@app/tools/information-schema';
import { ToolsRawSQLInformationSchemasService } from '@app/tools/information-schema/application/raw-sql/tools-raw-sql-information-schemas.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsRawSQLInformationSchemasQuery)
export class ToolsRawSQLInformationSchemasQueryHandler implements IQueryHandler<ToolsRawSQLInformationSchemasQuery>
{
    private readonly mapper: ToolsInformationSchemaMapper = new ToolsInformationSchemaMapper();

    constructor(
        private readonly rawSQLInformationSchemasService: ToolsRawSQLInformationSchemasService,
    ) {}

    async execute(query: ToolsRawSQLInformationSchemasQuery): Promise<ToolsInformationSchemaResponse>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.rawSQLInformationSchemasService.main(
                query.rawSQL,
                query.cQMetadata,
            ),
        );
    }
}
