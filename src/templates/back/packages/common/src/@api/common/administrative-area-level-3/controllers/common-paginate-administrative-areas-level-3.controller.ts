/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonPaginateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/paginate')
@Auth('common.administrativeAreaLevel3.get')
export class CommonPaginateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel3Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate administrative-areas-level-3' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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
