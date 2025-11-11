import { OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetScopesService {
    constructor(private readonly repository: OAuthIScopeRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthScope[] | LiteralObject[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
