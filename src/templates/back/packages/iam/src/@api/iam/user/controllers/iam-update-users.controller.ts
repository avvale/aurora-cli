/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto, IamUpdateUsersDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/update')
@Auth('iam.user.update')
export class IamUpdateUsersController
{
    constructor(
        private readonly handler: IamUpdateUsersHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update users' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamUserDto })
    async main(
        @Body() payload: IamUpdateUsersDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}