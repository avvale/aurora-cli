/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthAccessTokenDto,
    OAuthDeleteAccessTokenByIdHandler,
} from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/delete')
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokenByIdController {
    constructor(private readonly handler: OAuthDeleteAccessTokenByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete access-token by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
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
