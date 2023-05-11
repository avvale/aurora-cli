/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto, OAuthUpdateClientsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/update')
@Auth('oAuth.client.update')
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