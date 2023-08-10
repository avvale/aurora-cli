/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthDeleteRefreshTokenByIdHandler, OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
