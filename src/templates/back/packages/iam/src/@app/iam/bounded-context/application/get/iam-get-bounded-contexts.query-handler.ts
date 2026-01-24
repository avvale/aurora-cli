/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContext,
  IamBoundedContextMapper,
  IamBoundedContextResponse,
  IamGetBoundedContextsQuery,
} from '@app/iam/bounded-context';
import { IamGetBoundedContextsService } from '@app/iam/bounded-context/application/get/iam-get-bounded-contexts.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetBoundedContextsQuery)
export class IamGetBoundedContextsQueryHandler
  implements IQueryHandler<IamGetBoundedContextsQuery>
{
  private readonly mapper: IamBoundedContextMapper =
    new IamBoundedContextMapper();

  constructor(
    private readonly getBoundedContextsService: IamGetBoundedContextsService,
  ) {}

  async execute(
    query: IamGetBoundedContextsQuery,
  ): Promise<IamBoundedContextResponse[] | LiteralObject[]> {
    const models = await this.getBoundedContextsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamBoundedContext[]);
  }
}
