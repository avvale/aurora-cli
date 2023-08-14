/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreaLevel1ByIdDto, CommonUpsertAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/upsert')
@Auth('common.administrativeAreaLevel1.upsert')
export class CommonUpsertAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly handler: CommonUpsertAdministrativeAreaLevel1Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert administrative-area-level-1' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel1ByIdDto,
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
