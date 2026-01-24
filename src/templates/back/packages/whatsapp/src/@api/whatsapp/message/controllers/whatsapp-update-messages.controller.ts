/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappMessageDto,
  WhatsappUpdateMessagesDto,
  WhatsappUpdateMessagesHandler,
} from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/messages/update')
@Auth('whatsapp.message.update')
export class WhatsappUpdateMessagesController {
  constructor(private readonly handler: WhatsappUpdateMessagesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update messages' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: WhatsappMessageDto,
  })
  async main(
    @Body() payload: WhatsappUpdateMessagesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
