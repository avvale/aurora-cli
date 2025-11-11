/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeletePermissionsHandler,
    IamPermissionDto,
} from '@api/iam/permission';
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

@ApiTags('[iam] permission')
@Controller('iam/permissions/delete')
@Auth('iam.permission.delete')
export class IamDeletePermissionsController {
    constructor(private readonly handler: IamDeletePermissionsHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete permissions in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [IamPermissionDto],
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
