/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthUpdateClientsDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/update')
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateClientsController
{
    constructor(
        private readonly handler: OAuthUpdateClientsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update clients' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}