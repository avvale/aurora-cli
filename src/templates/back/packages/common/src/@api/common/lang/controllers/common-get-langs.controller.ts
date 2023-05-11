/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto } from '../dto';

// @app
import { CommonGetLangsHandler } from '../handlers/common-get-langs.handler';

@ApiTags('[common] lang')
@Controller('common/langs/get')
export class CommonGetLangsController
{
    constructor(
        private readonly handler: CommonGetLangsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get langs according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonLangDto]})
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