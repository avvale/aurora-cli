import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CountryResponse } from '../../domain/country.response';
import { CountryMapper } from '../../domain/country.mapper';
import { RawSQLCountriesQuery } from './raw-sql-countries.query';
import { RawSQLCountriesService } from './raw-sql-countries.service';

@QueryHandler(RawSQLCountriesQuery)
export class RawSQLCountriesQueryHandler implements IQueryHandler<RawSQLCountriesQuery>
{
    private readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        private readonly rawSQLCountriesService: RawSQLCountriesService,
    ) {}

    async execute(query: RawSQLCountriesQuery): Promise<CountryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLCountriesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}