/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteBoundedContextByIdHandler } from '../handlers/iam-delete-bounded-context-by-id.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/delete')
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextByIdController
{
    constructor(
        private readonly handler: IamDeleteBoundedContextByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamBoundedContextDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}