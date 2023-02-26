import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenResponse } from '../../domain/refresh-token.response';
import { RefreshTokenMapper } from '../../domain/refresh-token.mapper';
import { RawSQLRefreshTokensQuery } from './raw-sql-refresh-tokens.query';
import { RawSQLRefreshTokensService } from './raw-sql-refresh-tokens.service';

@QueryHandler(RawSQLRefreshTokensQuery)
export class RawSQLRefreshTokensQueryHandler implements IQueryHandler<RawSQLRefreshTokensQuery>
{
    private readonly mapper: RefreshTokenMapper = new RefreshTokenMapper();

    constructor(
        private readonly rawSQLRefreshTokensService: RawSQLRefreshTokensService,
    ) {}

    async execute(query: RawSQLRefreshTokensQuery): Promise<RefreshTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLRefreshTokensService.main(query.rawSQL, query.cQMetadata));
    }
}