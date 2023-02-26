/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';

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
        @Body() payload: IamUpdateAccountByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}