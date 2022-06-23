import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetCountriesQuery } from '@apps/common/country/application/get/get-countries.query';
import { CommonCountry } from '../../../../graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonGetCountriesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<CommonCountry[] | CommonCountryDto[]>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage, { defineDefaultLanguage: false });
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}