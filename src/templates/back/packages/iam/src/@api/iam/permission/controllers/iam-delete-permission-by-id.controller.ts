/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/delete')
@Auth('iam.permission.delete')
export class IamDeletePermissionByIdController
{
    constructor(
        private readonly handler: IamDeletePermissionByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamPermissionDto })
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