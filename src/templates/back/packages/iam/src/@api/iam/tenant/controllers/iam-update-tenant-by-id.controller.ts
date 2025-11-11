/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamTenantDto,
    IamUpdateTenantByIdDto,
    IamUpdateTenantByIdHandler,
} from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/update')
@Auth('iam.tenant.update')
export class IamUpdateTenantByIdController {
    constructor(private readonly handler: IamUpdateTenantByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: IamTenantDto,
    })
    async main(
        @Body() payload: IamUpdateTenantByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
