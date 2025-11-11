/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamCreatePermissionDto,
    IamCreatePermissionsHandler,
    IamPermissionDto,
} from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission')
@Controller('iam/permissions/create')
@Auth('iam.permission.create')
export class IamCreatePermissionsController {
    constructor(private readonly handler: IamCreatePermissionsHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [IamPermissionDto],
    })
    @ApiBody({ type: [IamCreatePermissionDto] })
    async main(
        @Body() payload: IamCreatePermissionDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
