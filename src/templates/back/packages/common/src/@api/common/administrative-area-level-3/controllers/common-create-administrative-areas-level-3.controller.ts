/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Dto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateAdministrativeAreasLevel3Handler } from '../handlers/common-create-administrative-areas-level-3.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/create')
@Auth('common.administrativeAreaLevel3.create')
export class CommonCreateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel3Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-3 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonAdministrativeAreaLevel3Dto]})
    @ApiBody({ type: [CommonCreateAdministrativeAreaLevel3Dto]})
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel3Dto[],
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