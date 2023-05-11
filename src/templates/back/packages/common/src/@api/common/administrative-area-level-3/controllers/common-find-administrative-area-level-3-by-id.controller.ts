/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

// @app
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-find-administrative-area-level-3-by-id.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/find')
export class CommonFindAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel3Dto })
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