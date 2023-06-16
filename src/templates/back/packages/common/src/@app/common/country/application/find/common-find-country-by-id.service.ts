import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';
import { CommonCountryId } from '../../domain/value-objects';

@Injectable()
export class CommonFindCountryByIdService
{
    constructor(
        private readonly repository: CommonICountryRepository,
    ) {}

    async main(
        id: CommonCountryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonCountry>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}