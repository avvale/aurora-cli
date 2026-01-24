/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  CurrentAccount,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageDeleteCustomerMessageInboxHandler } from '../handlers/message-delete-customer-message-inbox.handler';

@ApiTags('[message] inbox')
@Controller('message/inbox/delete-customer-message')
@Auth('message.inbox.update')
export class MessageDeleteCustomerMessageInboxController {
  constructor(
    private readonly handler: MessageDeleteCustomerMessageInboxHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: Boolean,
  })
  @TenantConstraint()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Body() id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(account, id, constraint, timezone, auditing);
  }
}
