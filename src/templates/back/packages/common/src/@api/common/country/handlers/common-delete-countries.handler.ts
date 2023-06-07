import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetCountriesQuery } from '@app/common/country/application/get/get-countries.query';
import { DeleteCountriesCommand } from '@app/common/country/application/delete/delete-countries.command';
import { CommonCountry } from '@api/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonDeleteCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry[] | CommonCountryDto[]>
    {
        constraint = await this.addI18nConstraintService.main(constraint, 'countryI18n', contentLanguage, { defineDefaultLanguage: false });
        const countries = await this.queryBus.ask(new GetCountriesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteCountriesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return countries;
    }
}