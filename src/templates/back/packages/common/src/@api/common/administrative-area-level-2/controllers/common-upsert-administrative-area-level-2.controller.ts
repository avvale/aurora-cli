/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreaLevel2ByIdDto, CommonUpsertAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/upsert')
@Auth('common.administrativeAreaLevel2.upsert')
export class CommonUpsertAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly handler: CommonUpsertAdministrativeAreaLevel2Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert administrative-area-level-2' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel2ByIdDto,
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
