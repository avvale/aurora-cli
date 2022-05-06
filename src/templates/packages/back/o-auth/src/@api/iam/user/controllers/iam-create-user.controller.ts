/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamUserDto, IamCreateUserDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/create')
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUserController
{
    constructor(
        private readonly handler: IamCreateUserHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamUserDto })
    async main(
        @Body() payload: IamCreateUserDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}