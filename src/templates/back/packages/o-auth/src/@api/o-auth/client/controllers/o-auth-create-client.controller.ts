/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthClientDto,
    OAuthCreateClientDto,
    OAuthCreateClientHandler,
} from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/create')
@Auth('oAuth.client.create')
export class OAuthCreateClientController {
    constructor(private readonly handler: OAuthCreateClientHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: OAuthClientDto,
    })
    async main(
        @Body() payload: OAuthCreateClientDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
