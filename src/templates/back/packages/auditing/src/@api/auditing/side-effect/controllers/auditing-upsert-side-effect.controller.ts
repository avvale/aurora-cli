/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto, AuditingUpsertSideEffectHandler } from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
