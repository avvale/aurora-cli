/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

// @apps
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-delete-administrative-area-level-2-by-id.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/delete')
export class CommonDeleteAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}