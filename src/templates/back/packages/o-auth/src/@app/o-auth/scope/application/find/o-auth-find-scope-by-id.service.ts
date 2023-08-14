import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';
import { OAuthScopeId } from '../../domain/value-objects';

@Injectable()
export class OAuthFindScopeByIdService
{
    constructor(
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        id: OAuthScopeId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthScope>
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
