import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';

@Injectable()
export class CommonGetCountriesService
{
    constructor(
        private readonly repository: CommonICountryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonCountry[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
