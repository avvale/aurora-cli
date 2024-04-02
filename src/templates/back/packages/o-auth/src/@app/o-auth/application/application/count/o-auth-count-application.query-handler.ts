import { OAuthCountApplicationQuery } from '@app/o-auth/application';
import { OAuthCountApplicationService } from '@app/o-auth/application/application/count/o-auth-count-application.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountApplicationQuery)
export class OAuthCountApplicationQueryHandler implements IQueryHandler<OAuthCountApplicationQuery>
{
    constructor(
        private readonly countApplicationService: OAuthCountApplicationService,
    ) {}

    async execute(query: OAuthCountApplicationQuery): Promise<number>
    {
        return await this.countApplicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
