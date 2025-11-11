import {
    OAuthApplicationClient,
    OAuthApplicationClientMapper,
    OAuthApplicationClientResponse,
    OAuthGetApplicationsClientsQuery,
} from '@app/o-auth/application-client';
import { OAuthGetApplicationsClientsService } from '@app/o-auth/application-client/application/get/o-auth-get-applications-clients.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetApplicationsClientsQuery)
export class OAuthGetApplicationsClientsQueryHandler
    implements IQueryHandler<OAuthGetApplicationsClientsQuery>
{
    private readonly mapper: OAuthApplicationClientMapper =
        new OAuthApplicationClientMapper();

    constructor(
        private readonly getApplicationsClientsService: OAuthGetApplicationsClientsService,
    ) {}

    async execute(
        query: OAuthGetApplicationsClientsQuery,
    ): Promise<OAuthApplicationClientResponse[] | LiteralObject[]> {
        const models = await this.getApplicationsClientsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as OAuthApplicationClient[],
        );
    }
}
