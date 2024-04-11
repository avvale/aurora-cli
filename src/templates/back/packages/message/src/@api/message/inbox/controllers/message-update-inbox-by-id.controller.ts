/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import { MessageInboxDto, MessageUpdateInboxByIdDto, MessageUpdateInboxByIdHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/update')
@Auth('message.inbox.update')
export class MessageUpdateInboxByIdController
{
    constructor(
        private readonly handler: MessageUpdateInboxByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update inbox by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageInboxDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageUpdateInboxByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
