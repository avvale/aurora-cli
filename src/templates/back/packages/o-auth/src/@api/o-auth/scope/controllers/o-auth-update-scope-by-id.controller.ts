/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateScopeByIdHandler } from '../handlers/o-auth-update-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/update')
@Auth('oAuth.scope.update')
export class OAuthUpdateScopeByIdController
{
    constructor(
        private readonly handler: OAuthUpdateScopeByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update scope by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthUpdateScopeByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}