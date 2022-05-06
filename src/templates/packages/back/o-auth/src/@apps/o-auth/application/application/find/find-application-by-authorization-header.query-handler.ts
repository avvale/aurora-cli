import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationResponse } from '../../domain/application.response';
import { ApplicationMapper } from '../../domain/application.mapper';
import { ApplicationAuthorizationHeader } from '../../domain/value-objects/application-authorization-header';
import { FindApplicationByAuthorizationHeaderQuery } from './find-application-by-authorization-header.query';
import { FindApplicationByAuthorizationHeaderService } from './find-application-by-authorization-header.service';

@QueryHandler(FindApplicationByAuthorizationHeaderQuery)
export class FindApplicationByAuthorizationHeaderQueryHandler implements IQueryHandler<FindApplicationByAuthorizationHeaderQuery>
{
    private readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        private readonly findApplicationByAuthorizationHeaderService: FindApplicationByAuthorizationHeaderService,
    ) { }

    async execute(query: FindApplicationByAuthorizationHeaderQuery): Promise<ApplicationResponse>
    {
        const application = await this.findApplicationByAuthorizationHeaderService.main(
            new ApplicationAuthorizationHeader(query.authorizationHeader),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}