import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';

@Injectable()
export class FindRefreshTokenService
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthRefreshToken>
    {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}