/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreasLevel1Dto, CommonUpdateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/update')
@Auth('common.administrativeAreaLevel1.update')
export class CommonUpdateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel1Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-1' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel1Dto,
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
