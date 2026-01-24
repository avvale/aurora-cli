/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateWebhookLogDto,
  ToolsCreateWebhookLogsHandler,
  ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-logs/create')
@Auth('tools.webhookLog.create')
export class ToolsCreateWebhookLogsController {
  constructor(private readonly handler: ToolsCreateWebhookLogsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create webhook-logs in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [ToolsWebhookLogDto],
  })
  @ApiBody({ type: [ToolsCreateWebhookLogDto] })
  async main(
    @Body() payload: ToolsCreateWebhookLogDto[],
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, timezone);
  }
}
