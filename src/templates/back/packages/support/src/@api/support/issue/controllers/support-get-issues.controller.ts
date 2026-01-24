/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SupportGetIssuesHandler, SupportIssueDto } from '@api/support/issue';
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

@ApiTags('[support] issue')
@Controller('support/issues/get')
@Auth('support.issue.get')
export class SupportGetIssuesController {
  constructor(private readonly handler: SupportGetIssuesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get issues according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [SupportIssueDto],
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
