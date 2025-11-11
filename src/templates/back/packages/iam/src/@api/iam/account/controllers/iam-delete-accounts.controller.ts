/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamDeleteAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/accounts/delete')
@Auth('iam.account.delete')
export class IamDeleteAccountsController {
    constructor(private readonly handler: IamDeleteAccountsHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete accounts in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [IamAccountDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
