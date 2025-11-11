import {
    OAuthAccessToken,
    OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindAccessTokenService {
    constructor(private readonly repository: OAuthIAccessTokenRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
