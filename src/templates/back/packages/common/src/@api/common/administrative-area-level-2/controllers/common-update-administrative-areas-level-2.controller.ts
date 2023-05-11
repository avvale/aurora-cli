/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreasLevel2Dto } from '../dto';

// @app
import { CommonUpdateAdministrativeAreasLevel2Handler } from '../handlers/common-update-administrative-areas-level-2.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/update')
export class CommonUpdateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel2Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-2' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel2Dto,
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