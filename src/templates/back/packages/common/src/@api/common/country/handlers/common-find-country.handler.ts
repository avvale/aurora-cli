import { Injectable } from '@nestjs/common';
import { AddI18nConstraintService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindCountryQuery } from '@app/common/country/application/find/find-country.query';
import { CommonCountry } from '@api/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonFindCountryHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        constraint = await this.addI18nConstraintService.main(constraint, 'countryI18n', contentLanguage);
        return await this.queryBus.ask(new FindCountryQuery(queryStatement, constraint, { timezone }));
    }
}