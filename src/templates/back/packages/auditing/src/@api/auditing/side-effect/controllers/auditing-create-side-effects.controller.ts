/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto, AuditingCreateSideEffectDto } from '../dto';

// @app
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/create')
@Permissions('auditing.sideEffect.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateSideEffectsController
{
    constructor(
        private readonly handler: AuditingCreateSideEffectsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create side-effects in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AuditingSideEffectDto]})
    @ApiBody({ type: [AuditingCreateSideEffectDto]})
    async main(
        @Body() payload: AuditingCreateSideEffectDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}