/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

// @app
import { CommonDeleteAdministrativeAreasLevel1Handler } from '../handlers/common-delete-administrative-areas-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/delete')
export class CommonDeleteAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel1Handler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-1 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [CommonAdministrativeAreaLevel1Dto]})
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