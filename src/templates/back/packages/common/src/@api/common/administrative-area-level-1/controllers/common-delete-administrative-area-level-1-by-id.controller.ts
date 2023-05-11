/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

// @app
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-delete-administrative-area-level-1-by-id.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/delete')
export class CommonDeleteAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonAdministrativeAreaLevel1Dto })
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