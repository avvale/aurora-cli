import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '@apps/common/country/application/find/find-country-by-id.query';
import { CommonCountry } from '../../../../graphql';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonFindCountryByIdHandler
{
    constructor(
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
        return await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));
    }
}