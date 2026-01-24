import {
  CommonFindLangQuery,
  CommonLangMapper,
  CommonLangResponse,
} from '@app/common/lang';
import { CommonFindLangService } from '@app/common/lang/application/find/common-find-lang.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindLangQuery)
export class CommonFindLangQueryHandler
  implements IQueryHandler<CommonFindLangQuery>
{
  private readonly mapper: CommonLangMapper = new CommonLangMapper();

  constructor(private readonly findLangService: CommonFindLangService) {}

  async execute(query: CommonFindLangQuery): Promise<CommonLangResponse> {
    const lang = await this.findLangService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(lang);
  }
}
