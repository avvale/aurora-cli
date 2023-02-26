/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/delete')
@Auth('iam.user.delete')
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