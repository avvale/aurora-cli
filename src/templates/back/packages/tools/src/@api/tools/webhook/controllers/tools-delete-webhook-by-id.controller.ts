/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteWebhookByIdHandler,
  ToolsWebhookDto,
} from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhook/delete')
@Auth('tools.webhook.delete')
export class ToolsDeleteWebhookByIdController {
  constructor(private readonly handler: ToolsDeleteWebhookByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete webhook by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: ToolsWebhookDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
