/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/update')
@Auth('iam.permission.update')
export class IamUpdatePermissionByIdController
{
    constructor(
        private readonly handler: IamUpdatePermissionByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamPermissionDto })
    async main(
        @Body() payload: IamUpdatePermissionByIdDto,
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