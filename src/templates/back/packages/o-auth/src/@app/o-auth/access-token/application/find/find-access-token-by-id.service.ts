import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurora-ts/core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { AccessTokenId } from '../../domain/value-objects';

@Injectable()
export class FindAccessTokenByIdService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        id: AccessTokenId,
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