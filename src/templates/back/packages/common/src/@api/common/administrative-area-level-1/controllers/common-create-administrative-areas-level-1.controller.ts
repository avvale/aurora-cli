/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Dto } from '../dto';

// @app
import { CommonCreateAdministrativeAreasLevel1Handler } from '../handlers/common-create-administrative-areas-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/create')
export class CommonCreateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel1Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-1 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonAdministrativeAreaLevel1Dto]})
    @ApiBody({ type: [CommonCreateAdministrativeAreaLevel1Dto]})
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel1Dto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}