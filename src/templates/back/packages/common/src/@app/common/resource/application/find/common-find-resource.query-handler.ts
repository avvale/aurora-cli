import {
  CommonFindResourceQuery,
  CommonResourceMapper,
  CommonResourceResponse,
} from '@app/common/resource';
import { CommonFindResourceService } from '@app/common/resource/application/find/common-find-resource.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindResourceQuery)
export class CommonFindResourceQueryHandler
  implements IQueryHandler<CommonFindResourceQuery>
{
  private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

  constructor(
    private readonly findResourceService: CommonFindResourceService,
  ) {}

  async execute(
    query: CommonFindResourceQuery,
  ): Promise<CommonResourceResponse> {
    const resource = await this.findResourceService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(resource);
  }
}
