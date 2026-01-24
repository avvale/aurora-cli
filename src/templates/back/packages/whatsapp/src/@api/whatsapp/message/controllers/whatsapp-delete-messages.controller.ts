/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappDeleteMessagesHandler,
  WhatsappMessageDto,
} from '@api/whatsapp/message';
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

@ApiTags('[whatsapp] message')
@Controller('whatsapp/messages/delete')
@Auth('whatsapp.message.delete')
export class WhatsappDeleteMessagesController {
  constructor(private readonly handler: WhatsappDeleteMessagesHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete messages in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [WhatsappMessageDto],
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
