/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthFindApplicationByIdHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Auth('oAuth.application.get')
export class OAuthFindApplicationByIdController {
    constructor(private readonly handler: OAuthFindApplicationByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: OAuthApplicationDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
