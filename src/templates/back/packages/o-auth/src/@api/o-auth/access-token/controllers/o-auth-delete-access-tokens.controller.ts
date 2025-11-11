/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthAccessTokenDto,
    OAuthDeleteAccessTokensHandler,
} from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/delete')
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokensController {
    constructor(private readonly handler: OAuthDeleteAccessTokensHandler) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete access-tokens in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [OAuthAccessTokenDto],
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
