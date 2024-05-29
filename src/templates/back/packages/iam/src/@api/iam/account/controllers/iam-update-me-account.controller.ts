/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountResponse } from '@app/iam/account';
import { IamUpdateMeAccountDto } from '../dto';
import { IamUpdateMeAccountHandler } from '../handlers/iam-update-me-account.handler';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/update-me')
@Auth('iam.account.update')
export class IamUpdateMeAccountController
{
    constructor(
        private readonly handler: IamUpdateMeAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: IamUpdateMeAccountDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            timezone,
            auditing,
        );
    }
}