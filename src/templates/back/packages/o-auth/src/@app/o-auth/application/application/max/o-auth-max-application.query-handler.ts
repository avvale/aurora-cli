import { OAuthMaxApplicationQuery } from '@app/o-auth/application';
import { OAuthMaxApplicationService } from '@app/o-auth/application/application/max/o-auth-max-application.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxApplicationQuery)
export class OAuthMaxApplicationQueryHandler implements IQueryHandler<OAuthMaxApplicationQuery>
{
    constructor(
        private readonly maxApplicationService: OAuthMaxApplicationService,
    ) {}

    async execute(query: OAuthMaxApplicationQuery): Promise<number>
    {
        return await this.maxApplicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
