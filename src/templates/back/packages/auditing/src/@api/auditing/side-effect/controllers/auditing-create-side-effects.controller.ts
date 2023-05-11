/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto, AuditingCreateSideEffectDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/create')
@Auth('auditing.sideEffect.create')
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