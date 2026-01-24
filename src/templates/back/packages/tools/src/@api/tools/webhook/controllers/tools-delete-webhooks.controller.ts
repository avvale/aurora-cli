/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteWebhooksHandler,
  ToolsWebhookDto,
} from '@api/tools/webhook';
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

@ApiTags('[tools] webhook')
@Controller('tools/webhooks/delete')
@Auth('tools.webhook.delete')
export class ToolsDeleteWebhooksController {
  constructor(private readonly handler: ToolsDeleteWebhooksHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete webhooks in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [ToolsWebhookDto],
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
