/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreaLevel1ByIdDto } from '../dto';

// @app
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-update-administrative-area-level-1-by-id.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/update')
export class CommonUpdateAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel1ByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}