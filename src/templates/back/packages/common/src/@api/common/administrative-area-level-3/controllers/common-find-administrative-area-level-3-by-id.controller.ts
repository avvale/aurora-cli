/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel3Dto, CommonFindAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/find')
@Auth('common.administrativeAreaLevel3.get')
export class CommonFindAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonAdministrativeAreaLevel3Dto })
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
