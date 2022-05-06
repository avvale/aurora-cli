import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccessTokenResponse } from '../../domain/access-token.response';
import { AccessTokenMapper } from '../../domain/access-token.mapper';
import { AccessTokenId } from '../../domain/value-objects';
import { FindAccessTokenByIdQuery } from './find-access-token-by-id.query';
import { FindAccessTokenByIdService } from './find-access-token-by-id.service';

@QueryHandler(FindAccessTokenByIdQuery)
export class FindAccessTokenByIdQueryHandler implements IQueryHandler<FindAccessTokenByIdQuery>
{
    private readonly mapper: AccessTokenMapper = new AccessTokenMapper();

    constructor(
        private readonly findAccessTokenByIdService: FindAccessTokenByIdService,
    ) {}

    async execute(query: FindAccessTokenByIdQuery): Promise<AccessTokenResponse>
    {
        const accessToken = await this.findAccessTokenByIdService.main(
            new AccessTokenId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(accessToken);
    }
}