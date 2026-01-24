/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel1Dto,
  CommonFindAdministrativeAreaLevel1ByIdHandler,
} from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/find')
@Auth('common.administrativeAreaLevel1.get')
export class CommonFindAdministrativeAreaLevel1ByIdController {
  constructor(
    private readonly handler: CommonFindAdministrativeAreaLevel1ByIdHandler,
  ) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find administrative-area-level-1 by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: CommonAdministrativeAreaLevel1Dto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
