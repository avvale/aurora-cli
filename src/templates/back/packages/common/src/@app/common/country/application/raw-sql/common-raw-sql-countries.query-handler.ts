import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonCountryResponse } from '../../domain/common-country.response';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonRawSQLCountriesQuery } from './common-raw-sql-countries.query';
import { CommonRawSQLCountriesService } from './common-raw-sql-countries.service';

@QueryHandler(CommonRawSQLCountriesQuery)
export class CommonRawSQLCountriesQueryHandler implements IQueryHandler<CommonRawSQLCountriesQuery>
{
    private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        private readonly rawSQLCountriesService: CommonRawSQLCountriesService,
    ) {}

    async execute(query: CommonRawSQLCountriesQuery): Promise<CommonCountryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLCountriesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}