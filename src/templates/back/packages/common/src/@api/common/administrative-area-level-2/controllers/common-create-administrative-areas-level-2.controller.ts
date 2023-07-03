/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2Dto, CommonCreateAdministrativeAreaLevel2Dto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateAdministrativeAreasLevel2Handler } from '../handlers/common-create-administrative-areas-level-2.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/create')
@Auth('common.administrativeAreaLevel2.create')
export class CommonCreateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel2Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-2 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonAdministrativeAreaLevel2Dto]})
    @ApiBody({ type: [CommonCreateAdministrativeAreaLevel2Dto]})
    async main(
        @Body() payload: CommonCreateAdministrativeAreaLevel2Dto[],
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