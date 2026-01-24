/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsGetWebhooksHandler, ToolsWebhookDto } from '@api/tools/webhook';
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

@ApiTags('[tools] webhook')
@Controller('tools/webhooks/get')
@Auth('tools.webhook.get')
export class ToolsGetWebhooksController {
  constructor(private readonly handler: ToolsGetWebhooksHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get webhooks according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [ToolsWebhookDto],
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
