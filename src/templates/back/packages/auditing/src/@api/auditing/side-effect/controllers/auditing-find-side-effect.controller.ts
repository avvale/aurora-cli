/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingSideEffectDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/find')
@Auth('auditing.sideEffect.get')
export class AuditingFindSideEffectController
{
    constructor(
        private readonly handler: AuditingFindSideEffectHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find side-effect according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AuditingSideEffectDto })
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