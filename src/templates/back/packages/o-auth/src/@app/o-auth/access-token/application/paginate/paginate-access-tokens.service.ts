import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';

@Injectable()
export class PaginateAccessTokensService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthAccessToken>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}