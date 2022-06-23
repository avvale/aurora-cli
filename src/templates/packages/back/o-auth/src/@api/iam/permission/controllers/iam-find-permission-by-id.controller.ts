/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { IamPermissionDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/find')
@Permissions('iam.permission.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindPermissionByIdController
{
    constructor(
        private readonly handler: IamFindPermissionByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find permission by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamPermissionDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
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