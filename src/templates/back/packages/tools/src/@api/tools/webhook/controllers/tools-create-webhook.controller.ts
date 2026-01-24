/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateWebhookDto,
  ToolsCreateWebhookHandler,
  ToolsWebhookDto,
} from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhook/create')
@Auth('tools.webhook.create')
export class ToolsCreateWebhookController {
  constructor(private readonly handler: ToolsCreateWebhookHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create webhook' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ToolsWebhookDto,
  })
  async main(
    @Body() payload: ToolsCreateWebhookDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
