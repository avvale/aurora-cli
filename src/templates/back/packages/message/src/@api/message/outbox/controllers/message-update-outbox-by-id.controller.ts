/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageOutboxDto,
  MessageUpdateOutboxByIdDto,
  MessageUpdateOutboxByIdHandler,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outbox/update')
@Auth('message.outbox.update')
export class MessageUpdateOutboxByIdController {
  constructor(private readonly handler: MessageUpdateOutboxByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update outbox by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: MessageOutboxDto,
  })
  async main(
    @Body() payload: MessageUpdateOutboxByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
