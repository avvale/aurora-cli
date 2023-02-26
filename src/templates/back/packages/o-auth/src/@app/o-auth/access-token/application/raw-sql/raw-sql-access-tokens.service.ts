import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';

@Injectable()
export class RawSQLAccessTokensService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
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