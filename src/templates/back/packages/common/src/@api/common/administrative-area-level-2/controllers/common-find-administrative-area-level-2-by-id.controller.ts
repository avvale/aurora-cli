/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel2Dto, CommonFindAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/find')
@Auth('common.administrativeAreaLevel2.get')
export class CommonFindAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonAdministrativeAreaLevel2Dto })
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
