/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteTagsHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tags/delete')
@Auth('iam.tag.delete')
export class IamDeleteTagsController
{
    constructor(
        private readonly handler: IamDeleteTagsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete tags in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamTagDto]})
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
