/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageFindInboxSettingByIdHandler, MessageInboxSettingDto } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/find')
@Auth('message.inboxSetting.get')
export class MessageFindInboxSettingByIdController
{
    constructor(
        private readonly handler: MessageFindInboxSettingByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find inbox-setting by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: MessageInboxSettingDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
