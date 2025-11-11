import {
    OAuthAccessToken,
    OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateAccessTokensService {
    constructor(private readonly repository: OAuthIAccessTokenRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthAccessToken>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
