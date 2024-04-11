/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessageFindInboxByIdHandler, MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/find')
@Auth('message.inbox.get')
export class MessageFindInboxByIdController
{
    constructor(
        private readonly handler: MessageFindInboxByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find inbox by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: MessageInboxDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            account,
            id,
            constraint,
            timezone,
        );
    }
}
