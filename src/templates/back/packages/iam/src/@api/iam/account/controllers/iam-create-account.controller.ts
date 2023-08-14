/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamCreateAccountDto, IamCreateAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, LiteralObject, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/create')
@Auth('iam.account.create')
export class IamCreateAccountController
{
    constructor(
        private readonly handler: IamCreateAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create account' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamAccountDto })
    async main(
        @Body() payload: IamCreateAccountDto,
        @Headers() headers: LiteralObject,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            headers,
            timezone,
            auditing,
        );
    }
}
