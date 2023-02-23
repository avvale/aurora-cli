/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto, IamUpdateBoundedContextsDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/update')
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateBoundedContextsController
{
    constructor(
        private readonly handler: IamUpdateBoundedContextsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-contexts' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamUpdateBoundedContextsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}