import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';

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
