import {
    OAuthApplication,
    OAuthApplicationMapper,
    OAuthApplicationResponse,
    OAuthGetApplicationsQuery,
} from '@app/o-auth/application';
import { OAuthGetApplicationsService } from '@app/o-auth/application/application/get/o-auth-get-applications.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetApplicationsQuery)
export class OAuthGetApplicationsQueryHandler
    implements IQueryHandler<OAuthGetApplicationsQuery>
{
    private readonly mapper: OAuthApplicationMapper =
        new OAuthApplicationMapper();

    constructor(
        private readonly getApplicationsService: OAuthGetApplicationsService,
    ) {}

    async execute(
        query: OAuthGetApplicationsQuery,
    ): Promise<OAuthApplicationResponse[] | LiteralObject[]> {
        const models = await this.getApplicationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as OAuthApplication[],
        );
    }
}
