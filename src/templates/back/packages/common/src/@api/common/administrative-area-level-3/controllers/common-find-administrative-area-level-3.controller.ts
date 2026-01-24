/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel3Dto,
  CommonFindAdministrativeAreaLevel3Handler,
} from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/find')
@Auth('common.administrativeAreaLevel3.get')
export class CommonFindAdministrativeAreaLevel3Controller {
  constructor(
    private readonly handler: CommonFindAdministrativeAreaLevel3Handler,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Find administrative-area-level-3 according to query',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CommonAdministrativeAreaLevel3Dto,
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
