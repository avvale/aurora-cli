/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeleteTenantsAccountsHandler,
    IamTenantAccountDto,
} from '@api/iam/tenant-account';
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

@ApiTags('[iam] tenant-account')
@Controller('iam/tenants-accounts/delete')
@Auth('iam.tenantAccount.delete')
export class IamDeleteTenantsAccountsController {
    constructor(private readonly handler: IamDeleteTenantsAccountsHandler) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete tenants-accounts in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [IamTenantAccountDto],
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
