/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonLangDto, CommonUpdateLangsDto, CommonUpdateLangsHandler } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/langs/update')
@Auth('common.lang.update')
export class CommonUpdateLangsController
{
    constructor(
        private readonly handler: CommonUpdateLangsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update langs' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonLangDto })
    async main(
        @Body() payload: CommonUpdateLangsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
