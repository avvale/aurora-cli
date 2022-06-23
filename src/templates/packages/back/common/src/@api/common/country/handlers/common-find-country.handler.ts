import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindCountryQuery } from '@apps/common/country/application/find/find-country.query';
import { CommonCountry } from '../../../../graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonFindCountryHandler
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
    ): Promise<CommonCountry | CommonCountryDto>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        return await this.queryBus.ask(new FindCountryQuery(queryStatement, constraint, { timezone }));
    }
}