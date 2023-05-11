/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto, CommonUpdateLangsDto } from '../dto';

// @app
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';

@ApiTags('[common] lang')
@Controller('common/langs/update')
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
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}