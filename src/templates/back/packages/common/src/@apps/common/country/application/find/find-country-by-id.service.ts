import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { ICountryRepository } from '../../domain/country.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { CountryId } from '../../domain/value-objects';

@Injectable()
export class FindCountryByIdService
{
    constructor(
        private readonly repository: ICountryRepository,
    ) {}

    async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonCountry>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}