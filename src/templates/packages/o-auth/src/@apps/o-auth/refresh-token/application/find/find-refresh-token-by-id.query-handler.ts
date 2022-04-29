import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenResponse } from '../../domain/refresh-token.response';
import { RefreshTokenMapper } from '../../domain/refresh-token.mapper';
import { RefreshTokenId } from '../../domain/value-objects';
import { FindRefreshTokenByIdQuery } from './find-refresh-token-by-id.query';
import { FindRefreshTokenByIdService } from './find-refresh-token-by-id.service';

@QueryHandler(FindRefreshTokenByIdQuery)
export class FindRefreshTokenByIdQueryHandler implements IQueryHandler<FindRefreshTokenByIdQuery>
{
    private readonly mapper: RefreshTokenMapper = new RefreshTokenMapper();

    constructor(
        private readonly findRefreshTokenByIdService: FindRefreshTokenByIdService,
    ) {}

    async execute(query: FindRefreshTokenByIdQuery): Promise<RefreshTokenResponse>
    {
        const refreshToken = await this.findRefreshTokenByIdService.main(
            new RefreshTokenId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(refreshToken);
    }
}