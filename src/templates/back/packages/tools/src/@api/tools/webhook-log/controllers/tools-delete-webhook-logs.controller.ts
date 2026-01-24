/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteWebhookLogsHandler,
  ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
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

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-logs/delete')
@Auth('tools.webhookLog.delete')
export class ToolsDeleteWebhookLogsController {
  constructor(private readonly handler: ToolsDeleteWebhookLogsHandler) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete webhook-logs in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [ToolsWebhookLogDto],
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
