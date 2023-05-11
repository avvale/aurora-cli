/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2Dto, CommonCreateAdministrativeAreaLevel2Dto } from '../dto';

// @app
import { CommonCreateAdministrativeAreaLevel2Handler } from '../handlers/common-create-administrative-area-level-2.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/create')
export class CommonCreateAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel2Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-2' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel2Dto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}