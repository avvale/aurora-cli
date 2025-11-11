/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthScopeDto,
    OAuthUpdateScopeByIdDto,
    OAuthUpdateScopeByIdHandler,
} from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/update')
@Auth('oAuth.scope.update')
export class OAuthUpdateScopeByIdController {
    constructor(private readonly handler: OAuthUpdateScopeByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update scope by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: OAuthScopeDto,
    })
    async main(
        @Body() payload: OAuthUpdateScopeByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
