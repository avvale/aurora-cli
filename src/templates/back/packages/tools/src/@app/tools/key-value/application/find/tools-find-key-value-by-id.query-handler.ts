import {
    ToolsFindKeyValueByIdQuery,
    ToolsKeyValueMapper,
    ToolsKeyValueResponse,
} from '@app/tools/key-value';
import { ToolsFindKeyValueByIdService } from '@app/tools/key-value/application/find/tools-find-key-value-by-id.service';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindKeyValueByIdQuery)
export class ToolsFindKeyValueByIdQueryHandler
    implements IQueryHandler<ToolsFindKeyValueByIdQuery>
{
    private readonly mapper: ToolsKeyValueMapper = new ToolsKeyValueMapper();

    constructor(
        private readonly findKeyValueByIdService: ToolsFindKeyValueByIdService,
    ) {}

    async execute(
        query: ToolsFindKeyValueByIdQuery,
    ): Promise<ToolsKeyValueResponse> {
        const keyValue = await this.findKeyValueByIdService.main(
            new ToolsKeyValueId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(keyValue);
    }
}
