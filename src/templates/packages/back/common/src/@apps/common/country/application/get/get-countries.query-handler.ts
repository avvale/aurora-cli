import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CountryResponse } from '../../domain/country.response';
import { CountryMapper } from '../../domain/country.mapper';
import { GetCountriesQuery } from './get-countries.query';
import { GetCountriesService } from './get-countries.service';

@QueryHandler(GetCountriesQuery)
export class GetCountriesQueryHandler implements IQueryHandler<GetCountriesQuery>
{
    private readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        private readonly getCountriesService: GetCountriesService,
    ) {}

    async execute(query: GetCountriesQuery): Promise<CountryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getCountriesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}