import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';
import { OAuthRefreshTokenId } from '../../domain/value-objects';

@Injectable()
export class OAuthFindRefreshTokenByIdService
{
    constructor(
        private readonly repository: OAuthIRefreshTokenRepository,
    ) {}

    async main(
        id: OAuthRefreshTokenId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthRefreshToken>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
