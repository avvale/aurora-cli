/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamRoleDto, IamUpdateRolesDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/update')
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRolesController
{
    constructor(
        private readonly handler: IamUpdateRolesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update roles' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamRoleDto })
    async main(
        @Body() payload: IamUpdateRolesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}