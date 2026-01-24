/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsPaginateWebhooksHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhooks/paginate')
@Auth('tools.webhook.get')
export class ToolsPaginateWebhooksController {
  constructor(private readonly handler: ToolsPaginateWebhooksHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate webhooks' })
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
