/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreasLevel1Dto } from '../dto';

// @app
import { CommonUpdateAdministrativeAreasLevel1Handler } from '../handlers/common-update-administrative-areas-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/update')
export class CommonUpdateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel1Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-1' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel1Dto,
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