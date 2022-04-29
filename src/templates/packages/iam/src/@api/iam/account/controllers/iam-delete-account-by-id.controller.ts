/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamAccountDto } from '../dto';

// @apps
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/delete')
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
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}