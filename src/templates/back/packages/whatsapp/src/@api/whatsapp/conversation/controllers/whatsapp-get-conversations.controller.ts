/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappConversationDto,
  WhatsappGetConversationsHandler,
} from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversations/get')
@Auth('whatsapp.conversation.get')
export class WhatsappGetConversationsController {
  constructor(private readonly handler: WhatsappGetConversationsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get conversations according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
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
