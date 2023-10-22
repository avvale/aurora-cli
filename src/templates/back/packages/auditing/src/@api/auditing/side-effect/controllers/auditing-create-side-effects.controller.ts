/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingCreateSideEffectDto, AuditingCreateSideEffectsHandler, AuditingSideEffectDto } from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
