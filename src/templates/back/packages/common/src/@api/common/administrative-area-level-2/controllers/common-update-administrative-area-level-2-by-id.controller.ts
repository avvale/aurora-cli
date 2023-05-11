/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreaLevel2ByIdDto } from '../dto';

// @app
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-update-administrative-area-level-2-by-id.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/update')
export class CommonUpdateAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel2ByIdDto,
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