/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageGetInboxSettingsHandler,
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
@Controller('message/inbox-settings/get')
@Auth('message.inboxSetting.get')
export class MessageGetInboxSettingsController {
    constructor(private readonly handler: MessageGetInboxSettingsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get inbox-settings according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [MessageInboxSettingDto],
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
