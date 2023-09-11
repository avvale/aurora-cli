/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthDeleteRefreshTokensHandler, OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/delete')
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokensController
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokensHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete refresh-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthRefreshTokenDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
