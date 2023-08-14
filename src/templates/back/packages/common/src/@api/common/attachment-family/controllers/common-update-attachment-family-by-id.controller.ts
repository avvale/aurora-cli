/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonUpdateAttachmentFamilyByIdDto, CommonUpdateAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/update')
@Auth('common.attachmentFamily.update')
export class CommonUpdateAttachmentFamilyByIdController
{
    constructor(
        private readonly handler: CommonUpdateAttachmentFamilyByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update attachment-family by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAttachmentFamilyDto })
    async main(
        @Body() payload: CommonUpdateAttachmentFamilyByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
