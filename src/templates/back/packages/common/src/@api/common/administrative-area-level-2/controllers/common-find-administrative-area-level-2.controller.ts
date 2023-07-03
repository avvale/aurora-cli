/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonFindAdministrativeAreaLevel2Handler } from '../handlers/common-find-administrative-area-level-2.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/find')
@Auth('common.administrativeAreaLevel2.get')
export class CommonFindAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel2Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-2 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel2Dto })
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