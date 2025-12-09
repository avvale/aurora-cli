/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportCreateCommentDto,
    SupportCreateCommentHandler,
} from '@api/support/comment';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comment/create')
@Auth('support.comment.create')
export class SupportCreateCommentController {
    constructor(private readonly handler: SupportCreateCommentHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create comment' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: SupportCommentDto,
    })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: SupportCreateCommentDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(account, payload, timezone, auditing);
    }
}
