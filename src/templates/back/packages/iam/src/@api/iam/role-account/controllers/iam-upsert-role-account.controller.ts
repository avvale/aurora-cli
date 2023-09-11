/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamRoleAccountDto, IamUpdateRoleAccountByIdDto, IamUpsertRoleAccountHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/upsert')
@Auth('iam.roleAccount.upsert')
export class IamUpsertRoleAccountController
{
    constructor(
        private readonly handler: IamUpsertRoleAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert role-account' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamRoleAccountDto })
    async main(
        @Body() payload: IamUpdateRoleAccountByIdDto,
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
