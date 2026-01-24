import {
  OAuthApplicationMapper,
  OAuthApplicationResponse,
  OAuthFindApplicationQuery,
} from '@app/o-auth/application';
import { OAuthFindApplicationService } from '@app/o-auth/application/application/find/o-auth-find-application.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindApplicationQuery)
export class OAuthFindApplicationQueryHandler
  implements IQueryHandler<OAuthFindApplicationQuery>
{
  private readonly mapper: OAuthApplicationMapper =
    new OAuthApplicationMapper();

  constructor(
    private readonly findApplicationService: OAuthFindApplicationService,
  ) {}

  async execute(
    query: OAuthFindApplicationQuery,
  ): Promise<OAuthApplicationResponse> {
    const application = await this.findApplicationService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(application);
  }
}
