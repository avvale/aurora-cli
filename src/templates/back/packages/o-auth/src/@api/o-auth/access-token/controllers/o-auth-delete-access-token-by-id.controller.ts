/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthAccessTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteAccessTokenByIdHandler } from '../handlers/o-auth-delete-access-token-by-id.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/delete')
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokenByIdController
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokenByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete access-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthAccessTokenDto })
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