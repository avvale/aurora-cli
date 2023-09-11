/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamRoleAccountDto, IamUpdateRoleAccountByIdDto, IamUpdateRoleAccountByIdHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/update')
@Auth('iam.roleAccount.update')
export class IamUpdateRoleAccountByIdController
{
    constructor(
        private readonly handler: IamUpdateRoleAccountByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role-account by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamRoleAccountDto })
    async main(
        @Body() payload: IamUpdateRoleAccountByIdDto,
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
