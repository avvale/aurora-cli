/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto, AuditingCreateSideEffectDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/create')
@Auth('auditing.sideEffect.create')
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