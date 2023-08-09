/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/create')
@Auth('common.administrativeAreaLevel3.create')
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
