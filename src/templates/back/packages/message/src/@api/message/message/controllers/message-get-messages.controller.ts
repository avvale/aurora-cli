/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import {
  MessageGetMessagesHandler,
  MessageMessageDto,
} from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/messages/get')
@Auth('message.message.get')
export class MessageGetMessagesController {
  constructor(private readonly handler: MessageGetMessagesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get messages according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [MessageMessageDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  @TenantConstraint()
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      account,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
