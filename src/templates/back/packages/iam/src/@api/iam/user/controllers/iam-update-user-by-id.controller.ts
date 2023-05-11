/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';

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