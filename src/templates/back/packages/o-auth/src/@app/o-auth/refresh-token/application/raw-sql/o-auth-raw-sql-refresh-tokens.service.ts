import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';

@Injectable()
export class OAuthRawSQLRefreshTokensService
{
    constructor(
        private readonly repository: OAuthIRefreshTokenRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthRefreshToken[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
