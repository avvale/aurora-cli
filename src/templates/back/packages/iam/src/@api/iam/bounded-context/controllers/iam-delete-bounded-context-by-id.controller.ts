/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamBoundedContextDto,
    IamDeleteBoundedContextByIdHandler,
} from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/delete')
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextByIdController {
    constructor(private readonly handler: IamDeleteBoundedContextByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamBoundedContextDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
