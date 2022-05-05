/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamRoleDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/find')
@Permissions('iam.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindRoleByIdController
{
    constructor(
        private readonly handler: IamFindRoleByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamRoleDto })
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