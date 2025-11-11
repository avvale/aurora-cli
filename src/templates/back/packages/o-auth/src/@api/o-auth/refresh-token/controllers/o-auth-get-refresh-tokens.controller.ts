/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthGetRefreshTokensHandler,
    OAuthRefreshTokenDto,
} from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/get')
@Auth('oAuth.refreshToken.get')
export class OAuthGetRefreshTokensController {
    constructor(private readonly handler: OAuthGetRefreshTokensHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get refresh-tokens according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [OAuthRefreshTokenDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
