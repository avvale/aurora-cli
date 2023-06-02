/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto } from '../dto';

// @app
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';

@ApiTags('[common] lang')
@Controller('common/lang/find')
export class CommonFindLangByIdController
{
    constructor(
        private readonly handler: CommonFindLangByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find lang by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonLangDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}