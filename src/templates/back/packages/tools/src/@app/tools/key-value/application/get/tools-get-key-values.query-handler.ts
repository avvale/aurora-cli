import {
  ToolsGetKeyValuesQuery,
  ToolsKeyValue,
  ToolsKeyValueMapper,
  ToolsKeyValueResponse,
} from '@app/tools/key-value';
import { ToolsGetKeyValuesService } from '@app/tools/key-value/application/get/tools-get-key-values.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetKeyValuesQuery)
export class ToolsGetKeyValuesQueryHandler
  implements IQueryHandler<ToolsGetKeyValuesQuery>
{
  private readonly mapper: ToolsKeyValueMapper = new ToolsKeyValueMapper();

  constructor(private readonly getKeyValuesService: ToolsGetKeyValuesService) {}

  async execute(
    query: ToolsGetKeyValuesQuery,
  ): Promise<ToolsKeyValueResponse[] | LiteralObject[]> {
    const models = await this.getKeyValuesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as ToolsKeyValue[]);
  }
}
