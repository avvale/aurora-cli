/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteSideEffectsHandler } from '../handlers/auditing-delete-side-effects.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/delete')
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectsController
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete side-effects in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AuditingSideEffectDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}