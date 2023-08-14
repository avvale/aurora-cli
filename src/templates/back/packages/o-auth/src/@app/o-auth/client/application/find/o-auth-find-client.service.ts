import { OAuthClient, OAuthIClientRepository } from '@app/o-auth/client';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindClientService
{
    constructor(
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
