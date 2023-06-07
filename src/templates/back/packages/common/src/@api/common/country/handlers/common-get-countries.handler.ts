import { Injectable } from '@nestjs/common';
import { AddI18nConstraintService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetCountriesQuery } from '@app/common/country/application/get/get-countries.query';
import { CommonCountry } from '@api/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonGetCountriesHandler
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
    ): Promise<CommonCountry[] | CommonCountryDto[]>
    {
        constraint = await this.addI18nConstraintService.main(
            constraint,
            'countryI18n',
            contentLanguage,
            { defineDefaultLanguage: false },
        );
        return await this.queryBus.ask(new GetCountriesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}