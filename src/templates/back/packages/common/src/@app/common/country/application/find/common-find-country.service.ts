import { CommonCountry } from '../../domain/common-country.aggregate';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindCountryService
{
    constructor(
        private readonly repository: CommonICountryRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonCountry>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}