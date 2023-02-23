/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/delete')
@Permissions('iam.role.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteRoleByIdController
{
    constructor(
        private readonly handler: IamDeleteRoleByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete role by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamRoleDto })
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