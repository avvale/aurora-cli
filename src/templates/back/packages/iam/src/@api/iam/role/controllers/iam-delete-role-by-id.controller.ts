/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/delete')
@Auth('iam.role.delete')
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