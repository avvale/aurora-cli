import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccessTokenResponse } from '../../domain/access-token.response';
import { AccessTokenMapper } from '../../domain/access-token.mapper';
import { RawSQLAccessTokensQuery } from './raw-sql-access-tokens.query';
import { RawSQLAccessTokensService } from './raw-sql-access-tokens.service';

@QueryHandler(RawSQLAccessTokensQuery)
export class RawSQLAccessTokensQueryHandler implements IQueryHandler<RawSQLAccessTokensQuery>
{
    private readonly mapper: AccessTokenMapper = new AccessTokenMapper();

    constructor(
        private readonly rawSQLAccessTokensService: RawSQLAccessTokensService,
    ) {}

    async execute(query: RawSQLAccessTokensQuery): Promise<AccessTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAccessTokensService.main(query.rawSQL, query.cQMetadata));
    }
}