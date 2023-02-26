import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurora-ts/core';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { RefreshTokenId } from '../../domain/value-objects';

@Injectable()
export class FindRefreshTokenByIdService
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        id: RefreshTokenId,
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