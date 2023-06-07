import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { ICountryRepository } from '../../domain/country.repository';
import { CommonCountry } from '../../domain/country.aggregate';

@Injectable()
export class RawSQLCountriesService
{
    constructor(
        private readonly repository: ICountryRepository,
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