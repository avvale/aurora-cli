/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto, CommonUpdateLangsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';

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