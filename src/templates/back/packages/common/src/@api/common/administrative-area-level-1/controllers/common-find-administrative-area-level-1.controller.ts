/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel1Dto, CommonFindAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/find')
@Auth('common.administrativeAreaLevel1.get')
export class CommonFindAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-1 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel1Dto })
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
