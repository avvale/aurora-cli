import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationResponse } from '../../domain/application.response';
import { ApplicationMapper } from '../../domain/application.mapper';
import { FindApplicationQuery } from './find-application.query';
import { FindApplicationService } from './find-application.service';

@QueryHandler(FindApplicationQuery)
export class FindApplicationQueryHandler implements IQueryHandler<FindApplicationQuery>
{
    private readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        private readonly findApplicationService: FindApplicationService,
    ) {}

    async execute(query: FindApplicationQuery): Promise<ApplicationResponse>
    {
        const application = await this.findApplicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}