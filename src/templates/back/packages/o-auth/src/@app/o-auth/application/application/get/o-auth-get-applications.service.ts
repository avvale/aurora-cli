import {
    OAuthApplication,
    OAuthIApplicationRepository,
} from '@app/o-auth/application';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetApplicationsService {
    constructor(private readonly repository: OAuthIApplicationRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplication[] | LiteralObject[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
