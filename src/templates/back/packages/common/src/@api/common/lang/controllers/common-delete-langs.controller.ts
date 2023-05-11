/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto } from '../dto';

// @app
import { CommonDeleteLangsHandler } from '../handlers/common-delete-langs.handler';

@ApiTags('[common] lang')
@Controller('common/langs/delete')
export class CommonDeleteLangsController
{
    constructor(
        private readonly handler: CommonDeleteLangsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete langs in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [CommonLangDto]})
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