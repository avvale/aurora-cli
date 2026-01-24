/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageFindOutboxByIdHandler,
  MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outbox/find')
@Auth('message.outbox.get')
export class MessageFindOutboxByIdController {
  constructor(private readonly handler: MessageFindOutboxByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find outbox by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: MessageOutboxDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
