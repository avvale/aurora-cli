import { OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindScopeByIdService {
    constructor(private readonly repository: OAuthIScopeRepository) {}

    async main(
        id: OAuthScopeId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthScope> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
