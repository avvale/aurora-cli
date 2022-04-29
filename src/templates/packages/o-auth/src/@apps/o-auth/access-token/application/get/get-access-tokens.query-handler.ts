import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccessTokenResponse } from '../../domain/access-token.response';
import { AccessTokenMapper } from '../../domain/access-token.mapper';
import { GetAccessTokensQuery } from './get-access-tokens.query';
import { GetAccessTokensService } from './get-access-tokens.service';

@QueryHandler(GetAccessTokensQuery)
export class GetAccessTokensQueryHandler implements IQueryHandler<GetAccessTokensQuery>
{
    private readonly mapper: AccessTokenMapper = new AccessTokenMapper();

    constructor(
        private readonly getAccessTokensService: GetAccessTokensService,
    ) {}

    async execute(query: GetAccessTokensQuery): Promise<AccessTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAccessTokensService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}