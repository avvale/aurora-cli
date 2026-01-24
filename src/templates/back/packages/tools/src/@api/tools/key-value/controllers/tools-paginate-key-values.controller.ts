/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsPaginateKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-values/paginate')
@Auth('tools.keyValue.get')
export class ToolsPaginateKeyValuesController {
  constructor(private readonly handler: ToolsPaginateKeyValuesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate key-values' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
