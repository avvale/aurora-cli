import {
    OAuthIRefreshTokenRepository,
    OAuthRefreshToken,
} from '@app/o-auth/refresh-token';
import { OAuthRefreshTokenId } from '@app/o-auth/refresh-token/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindRefreshTokenByIdService {
    constructor(private readonly repository: OAuthIRefreshTokenRepository) {}

    async main(
        id: OAuthRefreshTokenId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthRefreshToken> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
