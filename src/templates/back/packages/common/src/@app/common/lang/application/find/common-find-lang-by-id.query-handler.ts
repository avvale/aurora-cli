/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonFindLangByIdQuery,
  CommonLangMapper,
  CommonLangResponse,
} from '@app/common/lang';
import { CommonFindLangByIdService } from '@app/common/lang/application/find/common-find-lang-by-id.service';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindLangByIdQuery)
export class CommonFindLangByIdQueryHandler
  implements IQueryHandler<CommonFindLangByIdQuery>
{
  private readonly mapper: CommonLangMapper = new CommonLangMapper();

  constructor(
    private readonly findLangByIdService: CommonFindLangByIdService,
  ) {}

  async execute(query: CommonFindLangByIdQuery): Promise<CommonLangResponse> {
    const lang = await this.findLangByIdService.main(
      new CommonLangId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(lang);
  }
}
