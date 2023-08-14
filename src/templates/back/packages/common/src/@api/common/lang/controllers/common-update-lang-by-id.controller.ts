/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonLangDto, CommonUpdateLangByIdDto, CommonUpdateLangByIdHandler } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/update')
@Auth('common.lang.update')
export class CommonUpdateLangByIdController
{
    constructor(
        private readonly handler: CommonUpdateLangByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update lang by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonLangDto })
    async main(
        @Body() payload: CommonUpdateLangByIdDto,
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
