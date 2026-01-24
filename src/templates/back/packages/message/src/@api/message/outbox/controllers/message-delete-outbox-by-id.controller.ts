/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageDeleteOutboxByIdHandler,
  MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outbox/delete')
@Auth('message.outbox.delete')
export class MessageDeleteOutboxByIdController {
  constructor(private readonly handler: MessageDeleteOutboxByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete outbox by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: MessageOutboxDto,
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
