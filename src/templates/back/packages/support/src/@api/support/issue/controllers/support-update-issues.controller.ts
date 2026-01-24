/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  SupportIssueDto,
  SupportUpdateIssuesDto,
  SupportUpdateIssuesHandler,
} from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issues/update')
@Auth('support.issue.update')
export class SupportUpdateIssuesController {
  constructor(private readonly handler: SupportUpdateIssuesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update issues' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: SupportIssueDto,
  })
  async main(
    @Body() payload: SupportUpdateIssuesDto,
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
