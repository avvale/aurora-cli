/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto } from '../dto';

// @app
import { CommonDeleteCountryByIdHandler } from '../handlers/common-delete-country-by-id.handler';

@ApiTags('[common] country')
@Controller('common/country/delete')
export class CommonDeleteCountryByIdController
{
    constructor(
        private readonly handler: CommonDeleteCountryByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete country by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonCountryDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage?: string,
        );
    }
}