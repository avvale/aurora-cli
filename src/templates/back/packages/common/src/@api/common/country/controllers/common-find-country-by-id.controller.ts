/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryDto,
  CommonFindCountryByIdHandler,
} from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/country/find')
@Auth('common.country.get')
export class CommonFindCountryByIdController {
  constructor(private readonly handler: CommonFindCountryByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find country by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: CommonCountryDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
  ) {
    return await this.handler.main(id, constraint, timezone, contentLanguage);
  }
}
