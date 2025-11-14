/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingDeleteSideEffectsHandler,
    AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/delete')
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectsController {
    constructor(private readonly handler: AuditingDeleteSideEffectsHandler) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete side-effects in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [AuditingSideEffectDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
