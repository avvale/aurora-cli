/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonCountryDto,
  CommonUpdateCountriesDto,
  CommonUpdateCountriesHandler,
} from '@api/common/country';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  ContentLanguage,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/countries/update')
@Auth('common.country.update')
export class CommonUpdateCountriesController {
  constructor(private readonly handler: CommonUpdateCountriesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update countries' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CommonCountryDto,
  })
  async main(
    @Body() payload: CommonUpdateCountriesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}
