/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthCreateClientDto, OAuthCreateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
