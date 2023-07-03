/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreasLevel2Dto, CommonUpdateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/update')
@Auth('common.administrativeAreaLevel2.update')
export class CommonUpdateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel2Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-areas-level-2' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreasLevel2Dto,
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