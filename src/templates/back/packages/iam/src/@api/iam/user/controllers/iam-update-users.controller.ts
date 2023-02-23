/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto, IamUpdateUsersDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/update')
@Permissions('iam.user.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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