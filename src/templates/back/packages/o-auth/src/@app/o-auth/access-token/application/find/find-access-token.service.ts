import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';

@Injectable()
export class FindAccessTokenService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthAccessToken>
    {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}