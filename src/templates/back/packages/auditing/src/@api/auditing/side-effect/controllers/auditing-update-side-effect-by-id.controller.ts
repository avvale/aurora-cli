/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateSideEffectByIdHandler } from '../handlers/auditing-update-side-effect-by-id.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/update')
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectByIdController
{
    constructor(
        private readonly handler: AuditingUpdateSideEffectByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update side-effect by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AuditingSideEffectDto })
    async main(
        @Body() payload: AuditingUpdateSideEffectByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}