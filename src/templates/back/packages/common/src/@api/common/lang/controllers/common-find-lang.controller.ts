/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonFindLangHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/find')
@Auth('common.lang.get')
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
