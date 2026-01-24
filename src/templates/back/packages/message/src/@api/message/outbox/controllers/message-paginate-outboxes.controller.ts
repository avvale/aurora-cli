/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessagePaginateOutboxesHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outboxes/paginate')
@Auth('message.outbox.get')
export class MessagePaginateOutboxesController {
  constructor(private readonly handler: MessagePaginateOutboxesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate outboxes' })
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
