/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';

// @apps
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/create')
export class OAuthCreateClientController
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthCreateClientDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}