/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappConversationDto,
  WhatsappDeleteConversationsHandler,
} from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversations/delete')
@Auth('whatsapp.conversation.delete')
export class WhatsappDeleteConversationsController {
  constructor(private readonly handler: WhatsappDeleteConversationsHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete conversations in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [WhatsappConversationDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
