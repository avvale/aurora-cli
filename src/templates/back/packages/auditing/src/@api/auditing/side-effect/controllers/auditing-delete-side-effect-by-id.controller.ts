/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto } from '../dto';

// @app
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/delete')
@Permissions('auditing.sideEffect.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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