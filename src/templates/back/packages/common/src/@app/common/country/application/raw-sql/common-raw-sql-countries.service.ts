import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';

@Injectable()
export class CommonRawSQLCountriesService
{
    constructor(
        private readonly repository: CommonICountryRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonCountry[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
