import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationResponse } from '../../domain/application.response';
import { ApplicationMapper } from '../../domain/application.mapper';
import { GetApplicationsQuery } from './get-applications.query';
import { GetApplicationsService } from './get-applications.service';

@QueryHandler(GetApplicationsQuery)
export class GetApplicationsQueryHandler implements IQueryHandler<GetApplicationsQuery>
{
    private readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        private readonly getApplicationsService: GetApplicationsService,
    ) {}

    async execute(query: GetApplicationsQuery): Promise<ApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}