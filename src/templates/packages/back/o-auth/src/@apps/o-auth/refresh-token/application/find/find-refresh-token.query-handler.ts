import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenResponse } from '../../domain/refresh-token.response';
import { RefreshTokenMapper } from '../../domain/refresh-token.mapper';
import { FindRefreshTokenQuery } from './find-refresh-token.query';
import { FindRefreshTokenService } from './find-refresh-token.service';

@QueryHandler(FindRefreshTokenQuery)
export class FindRefreshTokenQueryHandler implements IQueryHandler<FindRefreshTokenQuery>
{
    private readonly mapper: RefreshTokenMapper = new RefreshTokenMapper();

    constructor(
        private readonly findRefreshTokenService: FindRefreshTokenService,
    ) {}

    async execute(query: FindRefreshTokenQuery): Promise<RefreshTokenResponse>
    {
        const refreshToken = await this.findRefreshTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(refreshToken);
    }
}