import { OAuthPaginateApplicationsClientsQuery } from '@app/o-auth/application-client';
import { OAuthPaginateApplicationsClientsService } from '@app/o-auth/application-client/application/paginate/o-auth-paginate-applications-clients.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateApplicationsClientsQuery)
export class OAuthPaginateApplicationsClientsQueryHandler implements IQueryHandler<OAuthPaginateApplicationsClientsQuery>
{
    constructor(
        private readonly paginateApplicationsClientsService: OAuthPaginateApplicationsClientsService,
    ) {}

    async execute(query: OAuthPaginateApplicationsClientsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationsClientsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
