import { OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthRawSQLScopesService
{
    constructor(
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthScope[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
