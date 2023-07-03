/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-find-administrative-area-level-1-by-id.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/find')
@Auth('common.administrativeAreaLevel1.get')
export class CommonFindAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonAdministrativeAreaLevel1Dto })
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