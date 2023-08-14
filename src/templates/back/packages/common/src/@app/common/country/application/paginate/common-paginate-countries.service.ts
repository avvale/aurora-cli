import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';

@Injectable()
export class CommonPaginateCountriesService
{
    constructor(
        private readonly repository: CommonICountryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<CommonCountry>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
