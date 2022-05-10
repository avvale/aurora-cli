/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/update')
@Permissions('iam.permission.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdatePermissionByIdController
{
    constructor(
        private readonly handler: IamUpdatePermissionByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamPermissionDto })
    async main(
        @Body() payload: IamUpdatePermissionByIdDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}