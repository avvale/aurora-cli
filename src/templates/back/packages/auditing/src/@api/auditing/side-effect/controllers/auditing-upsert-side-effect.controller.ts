/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '../dto';

// @app
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/upsert')
@Permissions('auditing.sideEffect.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpsertSideEffectController
{
    constructor(
        private readonly handler: AuditingUpsertSideEffectHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert side-effect' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: AuditingSideEffectDto })
    async main(
        @Body() payload: AuditingUpdateSideEffectByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}