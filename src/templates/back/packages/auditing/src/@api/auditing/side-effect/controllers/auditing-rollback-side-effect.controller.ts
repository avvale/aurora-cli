/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditingUpdateSideEffectByIdDto } from '../dto';
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/rollback')
@Auth('auditing.sideEffect.update')
export class AuditingRollbackSideEffectController {
    constructor(private readonly handler: AuditingRollbackSideEffectHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(
        @Body() payload: AuditingUpdateSideEffectByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, constraint, timezone);
    }
}
