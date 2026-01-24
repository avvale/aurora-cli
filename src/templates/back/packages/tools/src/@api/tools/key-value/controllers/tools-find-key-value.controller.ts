/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsFindKeyValueHandler,
  ToolsKeyValueDto,
} from '@api/tools/key-value';
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

@ApiTags('[tools] key-value')
@Controller('tools/key-value/find')
@Auth('tools.keyValue.get')
export class ToolsFindKeyValueController {
  constructor(private readonly handler: ToolsFindKeyValueHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find key-value according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ToolsKeyValueDto,
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
