/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/create')
@Auth('iam.role.create')
export class IamCreateRoleController
{
    constructor(
        private readonly handler: IamCreateRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamRoleDto })
    async main(
        @Body() payload: IamCreateRoleDto,
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