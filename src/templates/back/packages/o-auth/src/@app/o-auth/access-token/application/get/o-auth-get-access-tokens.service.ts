import {
    OAuthAccessToken,
    OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetAccessTokensService {
    constructor(private readonly repository: OAuthIAccessTokenRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken[] | LiteralObject[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
