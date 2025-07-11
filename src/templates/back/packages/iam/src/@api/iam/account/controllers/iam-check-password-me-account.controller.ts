/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountResponse } from '@app/iam/account';
import { IamCheckPasswordMeAccountHandler } from '../handlers/iam-check-password-me-account.handler';
import { CurrentAccount } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@aurora/decorators';

@ApiTags('[iam] account')
@Controller('iam/account/check-password-me')
@Auth()
export class IamCheckPasswordMeAccountController
{
    constructor(
        private readonly handler: IamCheckPasswordMeAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() password: string,
    )
    {
        return await this.handler.main(
            account,
            password,
        );
    }
}