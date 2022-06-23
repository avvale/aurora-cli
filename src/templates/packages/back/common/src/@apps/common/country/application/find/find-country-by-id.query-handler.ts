import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CountryResponse } from '../../domain/country.response';
import { CountryMapper } from '../../domain/country.mapper';
import { CountryId } from '../../domain/value-objects';
import { FindCountryByIdQuery } from './find-country-by-id.query';
import { FindCountryByIdService } from './find-country-by-id.service';

@QueryHandler(FindCountryByIdQuery)
export class FindCountryByIdQueryHandler implements IQueryHandler<FindCountryByIdQuery>
{
    private readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        private readonly findCountryByIdService: FindCountryByIdService,
    ) {}

    async execute(query: FindCountryByIdQuery): Promise<CountryResponse>
    {
        const country = await this.findCountryByIdService.main(
            new CountryId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(country);
    }
}