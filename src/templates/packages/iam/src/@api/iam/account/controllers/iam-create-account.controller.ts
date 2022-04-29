/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, Headers, LiteralObject } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// @apps
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/create')
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
    )
    {
        return await this.handler.main(
            payload,
            headers,
            timezone,
        );
    }
}