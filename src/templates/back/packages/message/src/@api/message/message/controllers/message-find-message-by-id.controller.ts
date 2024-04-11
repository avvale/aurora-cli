/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessageFindMessageByIdHandler, MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/message/find')
@Auth('message.message.get')
export class MessageFindMessageByIdController
{
    constructor(
        private readonly handler: MessageFindMessageByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find message by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: MessageMessageDto })
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
