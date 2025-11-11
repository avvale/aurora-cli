import {
    OAuthApplicationClient,
    OAuthIApplicationClientRepository,
} from '@app/o-auth/application-client';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateApplicationsClientsService {
    constructor(
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthApplicationClient>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
