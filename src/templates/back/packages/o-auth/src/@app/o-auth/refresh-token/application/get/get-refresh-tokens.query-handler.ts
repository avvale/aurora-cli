import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenResponse } from '../../domain/refresh-token.response';
import { RefreshTokenMapper } from '../../domain/refresh-token.mapper';
import { GetRefreshTokensQuery } from './get-refresh-tokens.query';
import { GetRefreshTokensService } from './get-refresh-tokens.service';

@QueryHandler(GetRefreshTokensQuery)
export class GetRefreshTokensQueryHandler implements IQueryHandler<GetRefreshTokensQuery>
{
    private readonly mapper: RefreshTokenMapper = new RefreshTokenMapper();

    constructor(
        private readonly getRefreshTokensService: GetRefreshTokensService,
    ) {}

    async execute(query: GetRefreshTokensQuery): Promise<RefreshTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getRefreshTokensService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}