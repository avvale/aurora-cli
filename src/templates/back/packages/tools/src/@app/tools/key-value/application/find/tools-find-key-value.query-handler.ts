import { ToolsFindKeyValueQuery, ToolsKeyValueMapper, ToolsKeyValueResponse } from '@app/tools/key-value';
import { ToolsFindKeyValueService } from '@app/tools/key-value/application/find/tools-find-key-value.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindKeyValueQuery)
export class ToolsFindKeyValueQueryHandler implements IQueryHandler<ToolsFindKeyValueQuery>
{
    private readonly mapper: ToolsKeyValueMapper = new ToolsKeyValueMapper();

    constructor(
        private readonly findKeyValueService: ToolsFindKeyValueService,
    ) {}

    async execute(query: ToolsFindKeyValueQuery): Promise<ToolsKeyValueResponse>
    {
        const keyValue = await this.findKeyValueService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(keyValue);
    }
}
