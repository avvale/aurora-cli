/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/update')
@Permissions('iam.permission.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}