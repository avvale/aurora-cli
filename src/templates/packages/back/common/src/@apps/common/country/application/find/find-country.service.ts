import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { ICountryRepository } from '../../domain/country.repository';
import { CommonCountry } from '../../domain/country.aggregate';

@Injectable()
export class FindCountryService
{
    constructor(
        private readonly repository: ICountryRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonCountry>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}