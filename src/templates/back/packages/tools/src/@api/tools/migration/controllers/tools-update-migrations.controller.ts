/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsMigrationDto,
  ToolsUpdateMigrationsDto,
  ToolsUpdateMigrationsHandler,
} from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migrations/update')
@Auth('tools.migration.update')
export class ToolsUpdateMigrationsController {
  constructor(private readonly handler: ToolsUpdateMigrationsHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update migrations' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ToolsMigrationDto,
  })
  async main(
    @Body() payload: ToolsUpdateMigrationsDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
