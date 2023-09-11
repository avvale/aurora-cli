import { OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetApplicationsClientsService
{
    constructor(
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplicationClient[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
