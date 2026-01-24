/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappDeleteMessageByIdHandler,
  WhatsappMessageDto,
} from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/delete')
@Auth('whatsapp.message.delete')
export class WhatsappDeleteMessageByIdController {
  constructor(private readonly handler: WhatsappDeleteMessageByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete message by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: WhatsappMessageDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
