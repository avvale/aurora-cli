/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/delete')
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteBoundedContextsController
{
    constructor(
        private readonly handler: IamDeleteBoundedContextsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete bounded-contexts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamBoundedContextDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}