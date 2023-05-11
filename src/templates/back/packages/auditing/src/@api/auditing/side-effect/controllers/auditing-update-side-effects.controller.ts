/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto, AuditingUpdateSideEffectsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateSideEffectsHandler } from '../handlers/auditing-update-side-effects.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/update')
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectsController
{
    constructor(
        private readonly handler: AuditingUpdateSideEffectsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update side-effects' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AuditingSideEffectDto })
    async main(
        @Body() payload: AuditingUpdateSideEffectsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}