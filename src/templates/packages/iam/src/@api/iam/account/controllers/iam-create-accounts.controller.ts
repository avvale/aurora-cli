/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// @apps
import { IamCreateAccountsHandler } from '../handlers/iam-create-accounts.handler';

@ApiTags('[iam] account')
@Controller('iam/accounts/create')
export class IamCreateAccountsController
{
    constructor(
        private readonly handler: IamCreateAccountsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create accounts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamAccountDto]})
    @ApiBody({ type: [IamCreateAccountDto]})
    async main(
        @Body() payload: IamCreateAccountDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}