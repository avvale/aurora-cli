/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto } from '../dto';
import { IamCheckUniqueEmailAccountHandler } from '../handlers/iam-check-unique-email-account.handler';
import { Auth } from '@aurora/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/check-unique-email')
@Auth('iam.account.get', 'iam.accountSettings.update')
export class IamCheckUniqueEmailAccountController
{
    constructor(
        private readonly handler: IamCheckUniqueEmailAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: [IamAccountDto]})
    async main(
        @Body() email: string,
        @Body() avoidEmails: string[],
    )
    {
        return await this.handler.main(
            email,
            avoidEmails,
        );
    }
}