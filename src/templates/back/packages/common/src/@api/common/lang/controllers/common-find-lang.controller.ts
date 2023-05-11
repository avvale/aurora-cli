/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto } from '../dto';

// @app
import { CommonFindLangHandler } from '../handlers/common-find-lang.handler';

@ApiTags('[common] lang')
@Controller('common/lang/find')
export class CommonFindLangController
{
    constructor(
        private readonly handler: CommonFindLangHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find lang according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonLangDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}