/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/delete')
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectByIdController
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete side-effect by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AuditingSideEffectDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}