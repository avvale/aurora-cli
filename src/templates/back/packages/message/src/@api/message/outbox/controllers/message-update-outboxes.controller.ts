/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageOutboxDto,
  MessageUpdateOutboxesDto,
  MessageUpdateOutboxesHandler,
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
@Controller('message/outboxes/update')
@Auth('message.outbox.update')
export class MessageUpdateOutboxesController {
  constructor(private readonly handler: MessageUpdateOutboxesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update outboxes' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: MessageOutboxDto,
  })
  async main(
    @Body() payload: MessageUpdateOutboxesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
