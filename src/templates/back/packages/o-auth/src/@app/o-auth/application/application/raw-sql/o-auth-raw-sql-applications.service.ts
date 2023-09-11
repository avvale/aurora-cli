import { OAuthApplication, OAuthIApplicationRepository } from '@app/o-auth/application';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthRawSQLApplicationsService
{
    constructor(
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplication[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
