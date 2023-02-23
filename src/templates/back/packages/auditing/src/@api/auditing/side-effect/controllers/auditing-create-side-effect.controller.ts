/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto, AuditingCreateSideEffectDto } from '../dto';

// @app
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/create')
@Permissions('auditing.sideEffect.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateSideEffectController
{
    constructor(
        private readonly handler: AuditingCreateSideEffectHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create side-effect' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AuditingSideEffectDto })
    async main(
        @Body() payload: AuditingCreateSideEffectDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}