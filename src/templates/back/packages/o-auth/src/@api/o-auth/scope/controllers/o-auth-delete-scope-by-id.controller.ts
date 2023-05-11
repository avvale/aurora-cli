/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthScopeDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/delete')
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopeByIdController
{
    constructor(
        private readonly handler: OAuthDeleteScopeByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete scope by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthScopeDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}