/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsFindMigrationHandler,
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
@Controller('tools/migration/find')
@Auth('tools.migration.get')
export class ToolsFindMigrationController {
  constructor(private readonly handler: ToolsFindMigrationHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find migration according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ToolsMigrationDto,
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
