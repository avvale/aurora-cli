import { CommonCountryDto } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { CommonFindCountryByIdQuery } from '@app/common/country';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindCountryByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        contentLanguage?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        if (!contentLanguage) throw new BadRequestException('To find a multi-language object, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            'countryI18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        return await this.queryBus.ask(new CommonFindCountryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
