import { OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthRawSQLApplicationsClientsService
{
    constructor(
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplicationClient[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
