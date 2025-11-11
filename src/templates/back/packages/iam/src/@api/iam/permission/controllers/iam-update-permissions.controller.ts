/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamPermissionDto,
    IamUpdatePermissionsDto,
    IamUpdatePermissionsHandler,
} from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission')
@Controller('iam/permissions/update')
@Auth('iam.permission.update')
export class IamUpdatePermissionsController {
    constructor(private readonly handler: IamUpdatePermissionsHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update permissions' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: IamPermissionDto,
    })
    async main(
        @Body() payload: IamUpdatePermissionsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
