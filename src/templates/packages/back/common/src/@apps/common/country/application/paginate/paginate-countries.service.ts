import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { ICountryRepository } from '../../domain/country.repository';
import { CommonCountry } from '../../domain/country.aggregate';

@Injectable()
export class PaginateCountriesService
{
    constructor(
        private readonly repository: ICountryRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonCountry>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}