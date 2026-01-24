/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteKeyValuesHandler,
  ToolsKeyValueDto,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-values/delete')
@Auth('tools.keyValue.delete')
export class ToolsDeleteKeyValuesController {
  constructor(private readonly handler: ToolsDeleteKeyValuesHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete key-values in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [ToolsKeyValueDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
