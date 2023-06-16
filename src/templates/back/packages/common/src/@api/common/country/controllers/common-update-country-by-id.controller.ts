/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCountryDto, CommonUpdateCountryByIdDto } from '../dto';
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/country/update')
@Auth('common.country.update')
export class CommonUpdateCountryByIdController
{
    constructor(
        private readonly handler: CommonUpdateCountryByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update country by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonUpdateCountryByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}