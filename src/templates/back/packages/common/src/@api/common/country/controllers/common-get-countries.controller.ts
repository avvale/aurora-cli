/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonCountryDto,
  CommonGetCountriesHandler,
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
@Controller('common/countries/get')
@Auth('common.country.get')
export class CommonGetCountriesController {
  constructor(private readonly handler: CommonGetCountriesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get countries according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [CommonCountryDto],
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
