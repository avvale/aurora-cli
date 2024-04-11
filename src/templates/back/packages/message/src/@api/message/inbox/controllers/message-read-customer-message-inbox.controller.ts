/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageReadCustomerMessageInboxHandler } from '../handlers/message-read-customer-message-inbox.handler';
import { TenantPolicy } from '@api/iam/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageUpdateInboxByIdDto } from '../dto';

@ApiTags('[message] inbox')
@Controller('message/inbox/read-customer-message')
@Auth('message.inbox.update')
export class MessageReadCustomerMessageInboxController
{
    constructor(
        private readonly handler: MessageReadCustomerMessageInboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body('inbox') inbox: MessageUpdateInboxByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            inbox,
            constraint,
            timezone,
            auditing,
        );
    }
}