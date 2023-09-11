import { CommonCountryMapper, CommonCountryResponse, CommonGetCountriesQuery } from '@app/common/country';
import { CommonGetCountriesService } from '@app/common/country/application/get/common-get-countries.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetCountriesQuery)
export class CommonGetCountriesQueryHandler implements IQueryHandler<CommonGetCountriesQuery>
{
    private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        private readonly getCountriesService: CommonGetCountriesService,
    ) {}

    async execute(query: CommonGetCountriesQuery): Promise<CommonCountryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getCountriesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
