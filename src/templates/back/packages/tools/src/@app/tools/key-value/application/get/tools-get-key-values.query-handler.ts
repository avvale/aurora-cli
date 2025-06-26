import { ToolsGetKeyValuesQuery, ToolsKeyValueMapper, ToolsKeyValueResponse } from '@app/tools/key-value';
import { ToolsGetKeyValuesService } from '@app/tools/key-value/application/get/tools-get-key-values.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetKeyValuesQuery)
export class ToolsGetKeyValuesQueryHandler implements IQueryHandler<ToolsGetKeyValuesQuery>
{
    private readonly mapper: ToolsKeyValueMapper = new ToolsKeyValueMapper();

    constructor(
        private readonly getKeyValuesService: ToolsGetKeyValuesService,
    ) {}

    async execute(query: ToolsGetKeyValuesQuery): Promise<ToolsKeyValueResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getKeyValuesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
