/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonDeleteLangByIdHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/delete')
@Auth('common.lang.delete')
export class CommonDeleteLangByIdController
{
    constructor(
        private readonly handler: CommonDeleteLangByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete lang by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonLangDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
