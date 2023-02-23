/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/delete')
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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