import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';

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
