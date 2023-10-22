/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingUpdateSideEffectByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/rollback')
@Auth('auditing.sideEffect.update')
export class AuditingRollbackSideEffectController
{
    constructor(
        private readonly handler: AuditingRollbackSideEffectHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
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