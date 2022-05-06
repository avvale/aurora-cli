/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamPermissionDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/delete')
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}