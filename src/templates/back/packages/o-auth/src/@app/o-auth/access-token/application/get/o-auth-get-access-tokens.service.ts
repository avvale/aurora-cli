import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthAccessToken } from '../../domain/o-auth-access-token.aggregate';

@Injectable()
export class OAuthGetAccessTokensService
{
    constructor(
        private readonly repository: OAuthIAccessTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
