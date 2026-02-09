/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonGetResourcesQuery,
  CommonResource,
  CommonResourceMapper,
  CommonResourceResponse,
} from '@app/common/resource';
import { CommonGetResourcesService } from '@app/common/resource/application/get/common-get-resources.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetResourcesQuery)
export class CommonGetResourcesQueryHandler
  implements IQueryHandler<CommonGetResourcesQuery>
{
  private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

  constructor(
    private readonly getResourcesService: CommonGetResourcesService,
  ) {}

  async execute(
    query: CommonGetResourcesQuery,
  ): Promise<CommonResourceResponse[] | LiteralObject[]> {
    const models = await this.getResourcesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as CommonResource[]);
  }
}
