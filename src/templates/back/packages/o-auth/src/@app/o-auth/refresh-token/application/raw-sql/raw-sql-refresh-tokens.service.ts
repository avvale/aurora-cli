import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';

@Injectable()
export class RawSQLRefreshTokensService
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
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