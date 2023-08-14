/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamUpdateUserByIdDto, IamUpdateUserByIdHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/user/update')
@Auth('iam.user.update')
export class IamUpdateUserByIdController
{
    constructor(
        private readonly handler: IamUpdateUserByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamUserDto })
    async main(
        @Body() payload: IamUpdateUserByIdDto,
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
