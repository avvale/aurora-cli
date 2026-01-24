/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsGetKeyValuesHandler,
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
@Controller('tools/key-values/get')
@Auth('tools.keyValue.get')
export class ToolsGetKeyValuesController {
  constructor(private readonly handler: ToolsGetKeyValuesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get key-values according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [ToolsKeyValueDto],
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
