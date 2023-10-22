/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingSideEffectDto, AuditingUpdateSideEffectsDto, AuditingUpdateSideEffectsHandler } from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
