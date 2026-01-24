/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { ContentLanguage } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonAdministrativeAreasCountryHandler } from '../handlers/common-administrative-areas-country.handler';

@ApiTags('[common] country')
@Controller('common/country/administrative-areas')
@Auth('common.country.get')
export class CommonAdministrativeAreasCountryController {
  constructor(
    private readonly handler: CommonAdministrativeAreasCountryHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({ description: 'Defines the action performed' })
  async main(
    @Body('countryId') countryId: string,
    @Body('administrativeAreaLevel1Id') administrativeAreaLevel1Id?: string,
    @Body('administrativeAreaLevel2Id') administrativeAreaLevel2Id?: string,
    @ContentLanguage() contentLanguage?: string,
  ) {
    return await this.handler.main(
      countryId,
      administrativeAreaLevel1Id,
      administrativeAreaLevel2Id,
      contentLanguage,
    );
  }
}
