/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonFindResourceByIdQuery,
  CommonResourceMapper,
  CommonResourceResponse,
} from '@app/common/resource';
import { CommonFindResourceByIdService } from '@app/common/resource/application/find/common-find-resource-by-id.service';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonFindResourceByIdQuery)
export class CommonFindResourceByIdQueryHandler
  implements IQueryHandler<CommonFindResourceByIdQuery>
{
  private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

  constructor(
    private readonly findResourceByIdService: CommonFindResourceByIdService,
  ) {}

  async execute(
    query: CommonFindResourceByIdQuery,
  ): Promise<CommonResourceResponse> {
    const resource = await this.findResourceByIdService.main(
      new CommonResourceId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(resource);
  }
}
