/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamAccountDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/delete')
@Auth('iam.account.delete')
export class IamDeleteAccountByIdController
{
    constructor(
        private readonly handler: IamDeleteAccountByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete account by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamAccountDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}