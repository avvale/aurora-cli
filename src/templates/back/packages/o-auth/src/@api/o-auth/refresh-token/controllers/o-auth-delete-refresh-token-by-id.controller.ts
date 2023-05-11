/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthRefreshTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/delete')
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokenByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthRefreshTokenDto })
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