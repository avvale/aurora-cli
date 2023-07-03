/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreasLevel3Dto, CommonUpdateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/update')
@Auth('common.administrativeAreaLevel3.update')
export class CommonUpdateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel3Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-3' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel3Dto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}