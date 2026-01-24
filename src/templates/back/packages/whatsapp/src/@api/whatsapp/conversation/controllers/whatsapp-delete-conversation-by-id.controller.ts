/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappConversationDto,
  WhatsappDeleteConversationByIdHandler,
} from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversation/delete')
@Auth('whatsapp.conversation.delete')
export class WhatsappDeleteConversationByIdController {
  constructor(
    private readonly handler: WhatsappDeleteConversationByIdHandler,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete conversation by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: WhatsappConversationDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
