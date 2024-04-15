/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageInboxDto } from '../dto';
import { MessageCountUnreadCustomerMessageInboxHandler } from '../handlers/message-count-unread-customer-message-inbox.handler';
import { TenantConstraint } from '@api/iam/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/count-unread-customer-message')
@Auth('message.inbox.get')
export class MessageCountUnreadCustomerMessageInboxController
{
    constructor(
        private readonly handler: MessageCountUnreadCustomerMessageInboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: [MessageInboxDto]})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
    )
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
        );
    }
}