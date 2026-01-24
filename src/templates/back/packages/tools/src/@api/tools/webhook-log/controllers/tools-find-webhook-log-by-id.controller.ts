/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsFindWebhookLogByIdHandler,
  ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-log/find')
@Auth('tools.webhookLog.get')
export class ToolsFindWebhookLogByIdController {
  constructor(private readonly handler: ToolsFindWebhookLogByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find webhook-log by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: ToolsWebhookLogDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
