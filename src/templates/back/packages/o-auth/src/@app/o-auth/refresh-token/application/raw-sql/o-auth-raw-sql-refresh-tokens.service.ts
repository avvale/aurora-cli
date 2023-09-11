import { OAuthIRefreshTokenRepository, OAuthRefreshToken } from '@app/o-auth/refresh-token';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
