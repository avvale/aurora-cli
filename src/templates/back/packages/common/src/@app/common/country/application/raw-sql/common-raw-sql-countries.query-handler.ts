import { CommonCountryMapper, CommonCountryResponse, CommonRawSQLCountriesQuery } from '@app/common/country';
import { CommonRawSQLCountriesService } from '@app/common/country/application/raw-sql/common-raw-sql-countries.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
