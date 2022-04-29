/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamAccountDto, IamUpdateAccountDto } from '../dto';

// @apps
import { IamUpdateAccountHandler } from '../handlers/iam-update-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/update')
export class IamUpdateAccountController
{
    constructor(
        private readonly handler: IamUpdateAccountHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update account' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamAccountDto})
    async main(
        @Body() payload: IamUpdateAccountDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}