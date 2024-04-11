/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import { MessageCreateMessageDto, MessageCreateMessagesHandler, MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/messages/create')
@Auth('message.message.create')
export class MessageCreateMessagesController
{
    constructor(
        private readonly handler: MessageCreateMessagesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create messages in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [MessageMessageDto]})
    @ApiBody({ type: [MessageCreateMessageDto]})
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageCreateMessageDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            timezone,
            auditing,
        );
    }
}
