import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccessTokenResponse } from '../../domain/access-token.response';
import { AccessTokenMapper } from '../../domain/access-token.mapper';
import { FindAccessTokenQuery } from './find-access-token.query';
import { FindAccessTokenService } from './find-access-token.service';

@QueryHandler(FindAccessTokenQuery)
export class FindAccessTokenQueryHandler implements IQueryHandler<FindAccessTokenQuery>
{
    private readonly mapper: AccessTokenMapper = new AccessTokenMapper();

    constructor(
        private readonly findAccessTokenService: FindAccessTokenService,
    ) {}

    async execute(query: FindAccessTokenQuery): Promise<AccessTokenResponse>
    {
        const accessToken = await this.findAccessTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(accessToken);
    }
}