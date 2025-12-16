/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportUpdateCommentByIdDto,
    SupportUpdateCommentByIdHandler,
} from '@api/support/comment';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comment/update')
@Auth('support.comment.update')
export class SupportUpdateCommentByIdController {
    constructor(private readonly handler: SupportUpdateCommentByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update comment by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: SupportCommentDto,
    })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: SupportUpdateCommentByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            account,
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
