/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsFindKeyValueByIdHandler,
  ToolsKeyValueDto,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-value/find')
@Auth('tools.keyValue.get')
export class ToolsFindKeyValueByIdController {
  constructor(private readonly handler: ToolsFindKeyValueByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find key-value by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: ToolsKeyValueDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
