/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import { MessageMessageDto, MessageUpdateMessagesDto, MessageUpdateMessagesHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/messages/update')
@Auth('message.message.update')
export class MessageUpdateMessagesController
{
    constructor(
        private readonly handler: MessageUpdateMessagesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update messages' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageMessageDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageUpdateMessagesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
