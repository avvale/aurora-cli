/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto } from '../dto';

// @app
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/find')
@Permissions('auditing.sideEffect.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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