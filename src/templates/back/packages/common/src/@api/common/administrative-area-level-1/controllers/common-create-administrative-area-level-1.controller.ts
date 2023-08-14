/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/create')
@Auth('common.administrativeAreaLevel1.create')
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
