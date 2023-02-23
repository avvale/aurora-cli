/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/delete')
@Permissions('iam.user.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteUserByIdController
{
    constructor(
        private readonly handler: IamDeleteUserByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamUserDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}