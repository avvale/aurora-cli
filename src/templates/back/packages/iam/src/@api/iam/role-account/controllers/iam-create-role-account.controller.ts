/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamCreateRoleAccountDto, IamCreateRoleAccountHandler, IamRoleAccountDto } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/create')
@Auth('iam.roleAccount.create')
export class IamCreateRoleAccountController
{
    constructor(
        private readonly handler: IamCreateRoleAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role-account' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamRoleAccountDto })
    async main(
        @Body() payload: IamCreateRoleAccountDto,
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
