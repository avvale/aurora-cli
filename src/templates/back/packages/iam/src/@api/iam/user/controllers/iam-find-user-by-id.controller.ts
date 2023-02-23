/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';

// @app
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Permissions('iam.user.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindUserByIdController
{
    constructor(
        private readonly handler: IamFindUserByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamUserDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}