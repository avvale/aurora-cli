/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  SupportFindIssueByIdHandler,
  SupportIssueDto,
} from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issue/find')
@Auth('support.issue.get')
export class SupportFindIssueByIdController {
  constructor(private readonly handler: SupportFindIssueByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find issue by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: SupportIssueDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
