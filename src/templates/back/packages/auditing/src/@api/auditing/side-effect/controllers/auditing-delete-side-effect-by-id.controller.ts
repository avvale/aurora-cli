/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingDeleteSideEffectByIdHandler,
    AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/delete')
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectByIdController {
    constructor(
        private readonly handler: AuditingDeleteSideEffectByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete side-effect by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: AuditingSideEffectDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
