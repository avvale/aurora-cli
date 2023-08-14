import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';

@Injectable()
export class OAuthRawSQLAccessTokensService
{
    constructor(
        private readonly repository: OAuthIAccessTokenRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
