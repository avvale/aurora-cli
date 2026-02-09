/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryDto,
  CommonFindCountryHandler,
} from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/country/find')
@Auth('common.country.get')
export class CommonFindCountryController {
  constructor(private readonly handler: CommonFindCountryHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find country according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CommonCountryDto,
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
  ) {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      contentLanguage,
    );
  }
}
