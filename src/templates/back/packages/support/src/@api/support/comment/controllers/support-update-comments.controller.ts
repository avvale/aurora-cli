/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  SupportCommentDto,
  SupportUpdateCommentsDto,
  SupportUpdateCommentsHandler,
} from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comments/update')
@Auth('support.comment.update')
export class SupportUpdateCommentsController {
  constructor(private readonly handler: SupportUpdateCommentsHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update comments' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: SupportCommentDto,
  })
  async main(
    @Body() payload: SupportUpdateCommentsDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
