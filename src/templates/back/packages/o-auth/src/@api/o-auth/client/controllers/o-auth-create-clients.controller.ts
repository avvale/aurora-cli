/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/create')
@Auth('oAuth.client.create')
export class OAuthCreateClientsController
{
    constructor(
        private readonly handler: OAuthCreateClientsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create clients in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthClientDto]})
    @ApiBody({ type: [OAuthCreateClientDto]})
    async main(
        @Body() payload: OAuthCreateClientDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}