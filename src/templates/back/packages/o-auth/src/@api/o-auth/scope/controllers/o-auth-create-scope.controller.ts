/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthCreateScopeDto, OAuthCreateScopeHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/create')
@Auth('oAuth.scope.create')
export class OAuthCreateScopeController
{
    constructor(
        private readonly handler: OAuthCreateScopeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create scope' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthCreateScopeDto,
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
