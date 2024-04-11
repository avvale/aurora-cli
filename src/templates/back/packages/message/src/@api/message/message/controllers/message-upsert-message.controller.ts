/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import { MessageMessageDto, MessageUpdateMessageByIdDto, MessageUpsertMessageHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/message/upsert')
@Auth('message.message.upsert')
export class MessageUpsertMessageController
{
    constructor(
        private readonly handler: MessageUpsertMessageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert message' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: MessageMessageDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageUpdateMessageByIdDto,
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
