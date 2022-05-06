/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Permissions('iam.user.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindUserByIdController
{
    constructor(
        private readonly handler: IamFindUserByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find user by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamUserDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
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