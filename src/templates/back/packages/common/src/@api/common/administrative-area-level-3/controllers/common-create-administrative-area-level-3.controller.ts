/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Dto } from '../dto';

// @app
import { CommonCreateAdministrativeAreaLevel3Handler } from '../handlers/common-create-administrative-area-level-3.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/create')
export class CommonCreateAdministrativeAreaLevel3Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel3Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-3' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel3Dto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}