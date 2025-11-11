/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteUserByIdHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/user/delete')
@Auth('iam.user.delete')
export class IamDeleteUserByIdController {
    constructor(private readonly handler: IamDeleteUserByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamUserDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
