import { OAuthMinApplicationQuery } from '@app/o-auth/application';
import { OAuthMinApplicationService } from '@app/o-auth/application/application/min/o-auth-min-application.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinApplicationQuery)
export class OAuthMinApplicationQueryHandler implements IQueryHandler<OAuthMinApplicationQuery>
{
    constructor(
        private readonly minApplicationService: OAuthMinApplicationService,
    ) {}

    async execute(query: OAuthMinApplicationQuery): Promise<number>
    {
        return await this.minApplicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
