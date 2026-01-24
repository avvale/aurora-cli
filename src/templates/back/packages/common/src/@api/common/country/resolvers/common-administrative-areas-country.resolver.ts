import {
  CommonAdministrativeAreasCountryHandler,
  CommonCountryDto,
} from '@api/common/country';
import {
  CommonAdministrativeAreaLevel1,
  CommonAdministrativeAreaLevel2,
  CommonAdministrativeAreaLevel3,
  CommonCountry,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { ContentLanguage } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.get')
export class CommonAdministrativeAreasCountryResolver {
  constructor(
    private readonly handler: CommonAdministrativeAreasCountryHandler,
  ) {}

  @Query('commonAdministrativeAreasCountry')
  async main(
    @Args('countryId') countryId: string,
    @Args('administrativeAreaLevel1Id') administrativeAreaLevel1Id?: string,
    @Args('administrativeAreaLevel2Id') administrativeAreaLevel2Id?: string,
    @ContentLanguage() contentLanguage?: string,
  ): Promise<{
    commonCountry?: CommonCountry | CommonCountryDto;
    administrativeAreasLevel1?: CommonAdministrativeAreaLevel1[];
    administrativeAreasLevel2?: CommonAdministrativeAreaLevel2[];
    administrativeAreasLevel3?: CommonAdministrativeAreaLevel3[];
  }> {
    return await this.handler.main(
      countryId,
      administrativeAreaLevel1Id,
      administrativeAreaLevel2Id,
      contentLanguage,
    );
  }
}
