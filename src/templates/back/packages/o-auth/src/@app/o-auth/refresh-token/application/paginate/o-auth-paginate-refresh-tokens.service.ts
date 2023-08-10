import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/o-auth-refresh-token.aggregate';

@Injectable()
export class OAuthPaginateRefreshTokensService
{
    constructor(
        private readonly repository: OAuthIRefreshTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthRefreshToken>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
