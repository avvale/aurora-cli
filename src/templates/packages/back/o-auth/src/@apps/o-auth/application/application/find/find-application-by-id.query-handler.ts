import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationResponse } from '../../domain/application.response';
import { ApplicationMapper } from '../../domain/application.mapper';
import { ApplicationId } from '../../domain/value-objects';
import { FindApplicationByIdQuery } from './find-application-by-id.query';
import { FindApplicationByIdService } from './find-application-by-id.service';

@QueryHandler(FindApplicationByIdQuery)
export class FindApplicationByIdQueryHandler implements IQueryHandler<FindApplicationByIdQuery>
{
    private readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        private readonly findApplicationByIdService: FindApplicationByIdService,
    ) {}

    async execute(query: FindApplicationByIdQuery): Promise<ApplicationResponse>
    {
        const application = await this.findApplicationByIdService.main(
            new ApplicationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}