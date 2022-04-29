/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';

// @apps
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/create')
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
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}