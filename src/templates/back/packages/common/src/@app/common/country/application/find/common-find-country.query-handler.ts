import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonCountryResponse } from '../../domain/common-country.response';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonFindCountryQuery } from './common-find-country.query';
import { CommonFindCountryService } from './common-find-country.service';

@QueryHandler(CommonFindCountryQuery)
export class CommonFindCountryQueryHandler implements IQueryHandler<CommonFindCountryQuery>
{
    private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        private readonly findCountryService: CommonFindCountryService,
    ) {}

    async execute(query: CommonFindCountryQuery): Promise<CommonCountryResponse>
    {
        const country = await this.findCountryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(country);
    }
}
