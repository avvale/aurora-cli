/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonFindLangByIdHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/find')
@Auth('common.lang.get')
export class CommonFindLangByIdController {
  constructor(private readonly handler: CommonFindLangByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find lang by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: CommonLangDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
