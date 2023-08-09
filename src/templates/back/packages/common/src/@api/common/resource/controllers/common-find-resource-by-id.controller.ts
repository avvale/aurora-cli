/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonFindResourceByIdHandler, CommonResourceDto } from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resource/find')
@Auth('common.resource.get')
export class CommonFindResourceByIdController
{
    constructor(
        private readonly handler: CommonFindResourceByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find resource by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonResourceDto })
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
