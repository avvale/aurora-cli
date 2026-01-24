/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MessageFindInboxSettingHandler,
  MessageInboxSettingDto,
} from '@api/message/inbox-setting';
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

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/find')
@Auth('message.inboxSetting.get')
export class MessageFindInboxSettingController {
  constructor(private readonly handler: MessageFindInboxSettingHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find inbox-setting according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MessageInboxSettingDto,
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
