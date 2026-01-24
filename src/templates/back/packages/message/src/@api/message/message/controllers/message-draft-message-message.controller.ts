/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
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
import { MessageUpdateMessageByIdDto } from '../dto';
import { MessageDraftMessageMessageHandler } from '../handlers/message-draft-message-message.handler';

@ApiTags('[message] message')
@Controller('message/message/draft-message')
@Auth('message.message.update')
export class MessageDraftMessageMessageController {
  constructor(private readonly handler: MessageDraftMessageMessageHandler) {}

  @Post()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: Boolean,
  })
  @TenantPolicy()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Body() message: MessageUpdateMessageByIdDto, // set message to pass TenantPolicy
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      account,
      message,
      constraint,
      timezone,
      auditing,
    );
  }
}
