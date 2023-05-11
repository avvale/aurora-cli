/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Dto } from '../dto';

// @app
import { CommonCreateAdministrativeAreaLevel1Handler } from '../handlers/common-create-administrative-area-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/create')
export class CommonCreateAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel1Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-1' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel1Dto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}