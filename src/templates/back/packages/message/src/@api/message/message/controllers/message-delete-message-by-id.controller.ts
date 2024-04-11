/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessageDeleteMessageByIdHandler, MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/message/delete')
@Auth('message.message.delete')
export class MessageDeleteMessageByIdController
{
    constructor(
        private readonly handler: MessageDeleteMessageByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete message by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageMessageDto })
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
