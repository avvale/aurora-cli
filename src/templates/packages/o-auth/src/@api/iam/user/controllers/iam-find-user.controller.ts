/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Permissions('iam.user.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindUserController
{
    constructor(
        private readonly handler: IamFindUserHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamUserDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}