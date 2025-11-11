import {
    OAuthIRefreshTokenRepository,
    OAuthRefreshToken,
} from '@app/o-auth/refresh-token';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateRefreshTokensService {
    constructor(private readonly repository: OAuthIRefreshTokenRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthRefreshToken>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
