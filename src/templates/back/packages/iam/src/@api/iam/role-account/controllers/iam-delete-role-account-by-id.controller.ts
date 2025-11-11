/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeleteRoleAccountByIdHandler,
    IamRoleAccountDto,
} from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/delete')
@Auth('iam.roleAccount.delete')
export class IamDeleteRoleAccountByIdController {
    constructor(private readonly handler: IamDeleteRoleAccountByIdHandler) {}

    @Delete(':roleId/:accountId')
    @ApiOperation({ summary: 'Delete role-account by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamRoleAccountDto,
    })
    async main(
        @Param('roleId') roleId: string,
        @Param('accountId') accountId: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            roleId,
            accountId,
            constraint,
            timezone,
            auditing,
        );
    }
}
