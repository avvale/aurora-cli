/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessageDeleteInboxByIdHandler, MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/delete')
@Auth('message.inbox.delete')
export class MessageDeleteInboxByIdController
{
    constructor(
        private readonly handler: MessageDeleteInboxByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete inbox by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageInboxDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
