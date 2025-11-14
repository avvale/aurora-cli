/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingGetSideEffectsHandler,
    AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/get')
@Auth('auditing.sideEffect.get')
export class AuditingGetSideEffectsController {
    constructor(private readonly handler: AuditingGetSideEffectsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get side-effects according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
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
