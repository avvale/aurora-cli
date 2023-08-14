import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';

@Injectable()
export class OAuthGetApplicationsService
{
    constructor(
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplication[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
