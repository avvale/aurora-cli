import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdI18nCommand } from '@app/common/country/application/delete/delete-country-by-id-i18n.command';
import { CommonCountry } from '@api/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonDeleteCountryByIdI18nHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        constraint = await this.addI18nConstraintService.main(
            constraint,
            'countryI18n',
            contentLanguage,
        );

        const country = await this.queryBus.ask(new FindCountryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteCountryByIdI18nCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return country;
    }
}