import {
  IamFindTagByIdQuery,
  IamTagMapper,
  IamTagResponse,
} from '@app/iam/tag';
import { IamFindTagByIdService } from '@app/iam/tag/application/find/iam-find-tag-by-id.service';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTagByIdQuery)
export class IamFindTagByIdQueryHandler
  implements IQueryHandler<IamFindTagByIdQuery>
{
  private readonly mapper: IamTagMapper = new IamTagMapper();

  constructor(private readonly findTagByIdService: IamFindTagByIdService) {}

  async execute(query: IamFindTagByIdQuery): Promise<IamTagResponse> {
    const tag = await this.findTagByIdService.main(
      new IamTagId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(tag);
  }
}
