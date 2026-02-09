/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonGetLangsQuery,
  CommonLang,
  CommonLangMapper,
  CommonLangResponse,
} from '@app/common/lang';
import { CommonGetLangsService } from '@app/common/lang/application/get/common-get-langs.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetLangsQuery)
export class CommonGetLangsQueryHandler
  implements IQueryHandler<CommonGetLangsQuery>
{
  private readonly mapper: CommonLangMapper = new CommonLangMapper();

  constructor(private readonly getLangsService: CommonGetLangsService) {}

  async execute(
    query: CommonGetLangsQuery,
  ): Promise<CommonLangResponse[] | LiteralObject[]> {
    const models = await this.getLangsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as CommonLang[]);
  }
}
