/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  SupportCommentDto,
  SupportFindCommentHandler,
} from '@api/support/comment';
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

@ApiTags('[support] comment')
@Controller('support/comment/find')
@Auth('support.comment.get')
export class SupportFindCommentController {
  constructor(private readonly handler: SupportFindCommentHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find comment according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: SupportCommentDto,
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
