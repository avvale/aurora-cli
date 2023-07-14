/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel2Dto, CommonGetAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/get')
@Auth('common.administrativeAreaLevel2.get')
export class CommonGetAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel2Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get administrative-areas-level-2 according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonAdministrativeAreaLevel2Dto]})
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
