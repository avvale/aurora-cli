/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/find')
@Auth('oAuth.client.get')
export class OAuthFindClientByIdController
{
    constructor(
        private readonly handler: OAuthFindClientByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find client by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: OAuthClientDto })
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