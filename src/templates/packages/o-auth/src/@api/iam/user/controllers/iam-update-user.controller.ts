/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto, IamUpdateUserDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/update')
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserController
{
    constructor(
        private readonly handler: IamUpdateUserHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamUserDto})
    async main(
        @Body() payload: IamUpdateUserDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}