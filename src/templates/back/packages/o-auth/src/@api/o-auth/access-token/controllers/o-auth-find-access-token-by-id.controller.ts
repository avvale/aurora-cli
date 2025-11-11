/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthAccessTokenDto,
    OAuthFindAccessTokenByIdHandler,
} from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/find')
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenByIdController {
    constructor(private readonly handler: OAuthFindAccessTokenByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find access-token by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: OAuthAccessTokenDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
