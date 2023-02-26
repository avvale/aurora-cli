/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/update')
@Auth('iam.role.update')
export class IamUpdateRoleByIdController
{
    constructor(
        private readonly handler: IamUpdateRoleByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamRoleDto })
    async main(
        @Body() payload: IamUpdateRoleByIdDto,
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