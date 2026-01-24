/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsGetMigrationsHandler,
  ToolsMigrationDto,
} from '@api/tools/migration';
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

@ApiTags('[tools] migration')
@Controller('tools/migrations/get')
@Auth('tools.migration.get')
export class ToolsGetMigrationsController {
  constructor(private readonly handler: ToolsGetMigrationsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get migrations according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [ToolsMigrationDto],
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
