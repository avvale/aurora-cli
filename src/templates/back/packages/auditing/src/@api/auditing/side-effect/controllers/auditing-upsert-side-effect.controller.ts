/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/upsert')
@Auth('auditing.sideEffect.upsert')
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