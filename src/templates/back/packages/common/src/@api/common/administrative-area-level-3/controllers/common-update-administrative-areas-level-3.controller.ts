/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreasLevel3Dto } from '../dto';

// @app
import { CommonUpdateAdministrativeAreasLevel3Handler } from '../handlers/common-update-administrative-areas-level-3.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/update')
export class CommonUpdateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel3Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-3' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel3Dto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}