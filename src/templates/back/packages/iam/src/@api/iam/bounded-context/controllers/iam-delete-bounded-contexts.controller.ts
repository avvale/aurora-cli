/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamBoundedContextDto, IamDeleteBoundedContextsHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/delete')
@Auth('iam.boundedContext.delete')
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
