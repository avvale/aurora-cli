import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CountryResponse } from '../../domain/country.response';
import { CountryMapper } from '../../domain/country.mapper';
import { FindCountryQuery } from './find-country.query';
import { FindCountryService } from './find-country.service';

@QueryHandler(FindCountryQuery)
export class FindCountryQueryHandler implements IQueryHandler<FindCountryQuery>
{
    private readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        private readonly findCountryService: FindCountryService,
    ) {}

    async execute(query: FindCountryQuery): Promise<CountryResponse>
    {
        const country = await this.findCountryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(country);
    }
}