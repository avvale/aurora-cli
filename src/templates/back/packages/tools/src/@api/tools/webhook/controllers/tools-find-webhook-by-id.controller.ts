/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsFindWebhookByIdHandler,
  ToolsWebhookDto,
} from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhook/find')
@Auth('tools.webhook.get')
export class ToolsFindWebhookByIdController {
  constructor(private readonly handler: ToolsFindWebhookByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find webhook by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: ToolsWebhookDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
