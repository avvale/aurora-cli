/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamUpdateRolesDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/update')
@Permissions('iam.role.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}