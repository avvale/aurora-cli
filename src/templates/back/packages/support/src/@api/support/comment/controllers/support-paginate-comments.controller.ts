/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SupportPaginateCommentsHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comments/paginate')
@Auth('support.comment.get')
export class SupportPaginateCommentsController {
  constructor(private readonly handler: SupportPaginateCommentsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate comments' })
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
