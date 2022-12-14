import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @apps
import { FindCountryByIdQuery } from '@apps/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdCommand } from '@apps/common/country/application/delete/delete-country-by-id.command';
import { CommonCountry } from '@api/graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonDeleteCountryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdCommand(id, constraint, { timezone }));

        return country;
    }
}