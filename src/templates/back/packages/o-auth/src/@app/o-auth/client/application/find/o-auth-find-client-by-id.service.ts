import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthClient } from '../../domain/o-auth-client.aggregate';
import { OAuthClientId } from '../../domain/value-objects';

@Injectable()
export class OAuthFindClientByIdService
{
    constructor(
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        id: OAuthClientId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient>
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
