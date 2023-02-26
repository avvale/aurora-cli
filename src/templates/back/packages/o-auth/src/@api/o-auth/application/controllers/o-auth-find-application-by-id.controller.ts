/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Auth('oAuth.application.get')
export class OAuthFindApplicationByIdController
{
    constructor(
        private readonly handler: OAuthFindApplicationByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: OAuthApplicationDto })
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