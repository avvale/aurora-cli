/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamPermissionDto,
    IamUpdatePermissionByIdDto,
    IamUpdatePermissionByIdHandler,
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
@Controller('iam/permission/update')
@Auth('iam.permission.update')
export class IamUpdatePermissionByIdController {
    constructor(private readonly handler: IamUpdatePermissionByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update permission by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: IamPermissionDto,
    })
    async main(
        @Body() payload: IamUpdatePermissionByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
