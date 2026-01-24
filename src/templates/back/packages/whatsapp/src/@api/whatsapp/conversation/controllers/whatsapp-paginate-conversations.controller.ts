/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappPaginateConversationsHandler } from '@api/whatsapp/conversation';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[whatsapp] conversation')
@Controller('whatsapp/conversations/paginate')
@Auth('whatsapp.conversation.get')
export class WhatsappPaginateConversationsController {
  constructor(private readonly handler: WhatsappPaginateConversationsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate conversations' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
