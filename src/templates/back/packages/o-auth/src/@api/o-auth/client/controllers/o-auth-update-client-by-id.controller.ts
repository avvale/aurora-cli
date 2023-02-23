/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateClientByIdHandler } from '../handlers/o-auth-update-client-by-id.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/update')
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateClientByIdController
{
    constructor(
        private readonly handler: OAuthUpdateClientByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientByIdDto,
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