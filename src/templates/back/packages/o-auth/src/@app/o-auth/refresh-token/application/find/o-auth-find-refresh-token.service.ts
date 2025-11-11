import {
    OAuthIRefreshTokenRepository,
    OAuthRefreshToken,
} from '@app/o-auth/refresh-token';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindRefreshTokenService {
    constructor(private readonly repository: OAuthIRefreshTokenRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthRefreshToken> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
