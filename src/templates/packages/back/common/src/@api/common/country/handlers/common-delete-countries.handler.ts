import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetCountriesQuery } from '@apps/common/country/application/get/get-countries.query';
import { DeleteCountriesCommand } from '@apps/common/country/application/delete/delete-countries.command';
import { CommonCountry } from 'src/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonDeleteCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
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
        const countries = await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountriesCommand(queryStatement, constraint, { timezone }));

        return countries;
    }
}