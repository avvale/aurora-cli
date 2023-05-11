/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Headers, LiteralObject, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { IamAccountDto, IamCreateAccountDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';

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