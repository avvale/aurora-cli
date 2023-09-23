import { CommonAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeArea, CommonAdministrativeAreaLevel1, CommonAdministrativeAreaLevel2, CommonAdministrativeAreaLevel3, CommonCountry } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { CommonGetAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2';
import { CommonGetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { CommonFindCountryByIdQuery } from '@app/common/country';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonCountryDto } from '../dto';

@Injectable()
export class CommonAdministrativeAreasCountryHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
    ) {}

    async main(
        countryId: string,
        administrativeAreaLevel1Id?: string,
        administrativeAreaLevel2Id?: string,
        contentLanguage?: string,
    ): Promise<{
        commonCountry: CommonCountry | CommonCountryDto;
        commonGetAdministrativeAreasLevel1?: CommonAdministrativeAreaLevel1[] | CommonAdministrativeAreaLevel1Dto[];
        commonGetAdministrativeAreasLevel2?: CommonAdministrativeAreaLevel2[] | CommonAdministrativeAreaLevel2Dto[];
        commonGetAdministrativeAreasLevel3?: CommonAdministrativeAreaLevel3[] | CommonAdministrativeAreaLevel3Dto[];
    }>
    {
        if (!contentLanguage) throw new BadRequestException('To find a multi-language object, the content-language header must be defined.');

        let commonCountry, commonGetAdministrativeAreasLevel1 = [], commonGetAdministrativeAreasLevel2 = [], commonGetAdministrativeAreasLevel3 = [];

        // get country
        try
        {
            const constraint = await this.coreAddI18nConstraintService.add(
                {},
                'countryI18n',
                contentLanguage,
                {
                    searchKeyLang: this.coreGetSearchKeyLangService.get(),
                },
            );

            commonCountry = await this.queryBus.ask(new CommonFindCountryByIdQuery(
                countryId,
                constraint,
            ));
        }
        catch (error)
        {
            if (error.status === 404) return null;

            throw new BadRequestException(error.message);
        }

        // check if the country has administrative areas defined
        const hasAdministrativeAreas = Array.isArray(commonCountry.administrativeAreas) && commonCountry.administrativeAreas.length !== 0;

        if (!hasAdministrativeAreas || commonCountry.administrativeAreas?.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_1))
        {
            commonGetAdministrativeAreasLevel1 = await this.queryBus.ask(new CommonGetAdministrativeAreasLevel1Query(
                {
                    where: {
                        countryId,
                    },
                },
            ));
        }

        if (
            administrativeAreaLevel1Id &&
            (!hasAdministrativeAreas || commonCountry.administrativeAreas?.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_2))
        )
        {
            commonGetAdministrativeAreasLevel2 = await this.queryBus.ask(new CommonGetAdministrativeAreasLevel2Query(
                {
                    where: {
                        countryId,
                        administrativeAreaLevel1Id,
                    },
                },
            ));
        }

        if (
            administrativeAreaLevel2Id &&
            (!hasAdministrativeAreas || commonCountry.administrativeAreas?.includes(CommonAdministrativeArea.ADMINISTRATIVE_AREA_LEVEL_3))
        )
        {
            commonGetAdministrativeAreasLevel3 = await this.queryBus.ask(new CommonGetAdministrativeAreasLevel3Query(
                {
                    where: {
                        countryId,
                        administrativeAreaLevel1Id,
                        administrativeAreaLevel2Id,
                    },
                },
            ));
        }

        return {
            commonCountry,
            commonGetAdministrativeAreasLevel1,
            commonGetAdministrativeAreasLevel2,
            commonGetAdministrativeAreasLevel3,
        };
    }
}