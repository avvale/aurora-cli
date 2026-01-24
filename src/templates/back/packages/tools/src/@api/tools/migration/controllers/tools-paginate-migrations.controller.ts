/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsPaginateMigrationsHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migrations/paginate')
@Auth('tools.migration.get')
export class ToolsPaginateMigrationsController {
  constructor(private readonly handler: ToolsPaginateMigrationsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate migrations' })
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
