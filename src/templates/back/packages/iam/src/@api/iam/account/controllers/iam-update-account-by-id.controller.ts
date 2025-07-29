/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamUpdateAccountByIdDto, IamUpdateAccountByIdHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/update')
@Auth('iam.account.update')
export class IamUpdateAccountByIdController
{
    constructor(
        private readonly handler: IamUpdateAccountByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update account by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamAccountDto })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: IamUpdateAccountByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
