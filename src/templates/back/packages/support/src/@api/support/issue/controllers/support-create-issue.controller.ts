/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  SupportCreateIssueDto,
  SupportCreateIssueHandler,
  SupportIssueDto,
} from '@api/support/issue';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  CurrentAccount,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issue/create')
@Auth('support.issue.create')
export class SupportCreateIssueController {
  constructor(private readonly handler: SupportCreateIssueHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create issue' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SupportIssueDto,
  })
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Body() payload: SupportCreateIssueDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
