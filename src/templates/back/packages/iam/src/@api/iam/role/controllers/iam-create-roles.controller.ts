/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/create')
@Auth('iam.role.create')
export class IamCreateRolesController
{
    constructor(
        private readonly handler: IamCreateRolesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamRoleDto]})
    @ApiBody({ type: [IamCreateRoleDto]})
    async main(
        @Body() payload: IamCreateRoleDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}