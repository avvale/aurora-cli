/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { AuditingSideEffectDto } from '../dto';

// @app
import { AuditingGetSideEffectsHandler } from '../handlers/auditing-get-side-effects.handler';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/get')
@Permissions('auditing.sideEffect.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingGetSideEffectsController
{
    constructor(
        private readonly handler: AuditingGetSideEffectsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get side-effects according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AuditingSideEffectDto]})
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