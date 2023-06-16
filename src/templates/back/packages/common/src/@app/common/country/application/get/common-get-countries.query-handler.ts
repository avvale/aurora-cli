import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonCountryResponse } from '../../domain/common-country.response';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonGetCountriesQuery } from './common-get-countries.query';
import { CommonGetCountriesService } from './common-get-countries.service';

@QueryHandler(CommonGetCountriesQuery)
export class CommonGetCountriesQueryHandler implements IQueryHandler<CommonGetCountriesQuery>
{
    private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        private readonly getCountriesService: CommonGetCountriesService,
    ) {}

    async execute(query: CommonGetCountriesQuery): Promise<CommonCountryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getCountriesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}