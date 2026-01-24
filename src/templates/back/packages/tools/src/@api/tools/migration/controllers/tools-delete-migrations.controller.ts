/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteMigrationsHandler,
  ToolsMigrationDto,
} from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migrations/delete')
@Auth('tools.migration.delete')
export class ToolsDeleteMigrationsController {
  constructor(private readonly handler: ToolsDeleteMigrationsHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete migrations in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
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
