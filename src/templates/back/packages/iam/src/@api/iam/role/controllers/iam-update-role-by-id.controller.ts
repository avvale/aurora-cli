/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/update')
@Permissions('iam.role.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateRoleByIdController
{
    constructor(
        private readonly handler: IamUpdateRoleByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamRoleDto })
    async main(
        @Body() payload: IamUpdateRoleByIdDto,
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