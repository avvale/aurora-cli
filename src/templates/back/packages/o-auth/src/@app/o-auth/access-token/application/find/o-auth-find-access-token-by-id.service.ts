import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';
import { OAuthAccessTokenId } from '../../domain/value-objects';

@Injectable()
export class OAuthFindAccessTokenByIdService
{
    constructor(
        private readonly repository: OAuthIAccessTokenRepository,
    ) {}

    async main(
        id: OAuthAccessTokenId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken>
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
