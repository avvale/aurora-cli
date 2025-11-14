/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingCreateSideEffectDto,
    AuditingCreateSideEffectHandler,
    AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/create')
@Auth('auditing.sideEffect.create')
export class AuditingCreateSideEffectController {
    constructor(private readonly handler: AuditingCreateSideEffectHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create side-effect' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: AuditingSideEffectDto,
    })
    async main(
        @Body() payload: AuditingCreateSideEffectDto,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, timezone);
    }
}
