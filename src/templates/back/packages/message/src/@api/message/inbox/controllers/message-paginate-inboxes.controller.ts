/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessagePaginateInboxesHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  CurrentAccount,
  Pagination,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inboxes/paginate')
@Auth('message.inbox.get')
export class MessagePaginateInboxesController {
  constructor(private readonly handler: MessagePaginateInboxesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate inboxes' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
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
