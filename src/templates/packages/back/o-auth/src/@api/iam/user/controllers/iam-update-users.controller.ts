/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto, IamUpdateUsersDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/update')
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}