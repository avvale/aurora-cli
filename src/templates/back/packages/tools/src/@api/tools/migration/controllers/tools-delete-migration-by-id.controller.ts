/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteMigrationByIdHandler,
  ToolsMigrationDto,
} from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migration/delete')
@Auth('tools.migration.delete')
export class ToolsDeleteMigrationByIdController {
  constructor(private readonly handler: ToolsDeleteMigrationByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete migration by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: ToolsMigrationDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
