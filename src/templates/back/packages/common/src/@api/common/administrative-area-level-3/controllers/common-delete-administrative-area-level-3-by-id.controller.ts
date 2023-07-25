/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel3Dto, CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/delete')
@Auth('common.administrativeAreaLevel3.delete')
export class CommonDeleteAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonAdministrativeAreaLevel3Dto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
