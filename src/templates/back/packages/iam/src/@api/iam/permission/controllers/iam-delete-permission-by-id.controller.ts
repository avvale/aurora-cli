/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeletePermissionByIdHandler,
    IamPermissionDto,
} from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission')
@Controller('iam/permission/delete')
@Auth('iam.permission.delete')
export class IamDeletePermissionByIdController {
    constructor(private readonly handler: IamDeletePermissionByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamPermissionDto,
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
