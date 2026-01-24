/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageCreateOutboxDto,
  MessageCreateOutboxHandler,
  MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outbox/create')
@Auth('message.outbox.create')
export class MessageCreateOutboxController {
  constructor(private readonly handler: MessageCreateOutboxHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create outbox' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: MessageOutboxDto,
  })
  async main(
    @Body() payload: MessageCreateOutboxDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
