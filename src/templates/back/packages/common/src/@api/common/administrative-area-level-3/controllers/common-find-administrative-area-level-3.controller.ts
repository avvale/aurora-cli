/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

// @app
import { CommonFindAdministrativeAreaLevel3Handler } from '../handlers/common-find-administrative-area-level-3.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/find')
export class CommonFindAdministrativeAreaLevel3Controller
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel3Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-3 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel3Dto })
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