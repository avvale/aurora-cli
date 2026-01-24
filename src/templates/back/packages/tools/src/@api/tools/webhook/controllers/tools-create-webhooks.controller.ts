/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateWebhookDto,
  ToolsCreateWebhooksHandler,
  ToolsWebhookDto,
} from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhooks/create')
@Auth('tools.webhook.create')
export class ToolsCreateWebhooksController {
  constructor(private readonly handler: ToolsCreateWebhooksHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create webhooks in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [ToolsWebhookDto],
  })
  @ApiBody({ type: [ToolsCreateWebhookDto] })
  async main(
    @Body() payload: ToolsCreateWebhookDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
