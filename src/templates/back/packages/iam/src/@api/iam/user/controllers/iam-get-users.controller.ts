/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';

// @app
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/get')
@Permissions('iam.user.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetUsersController
{
    constructor(
        private readonly handler: IamGetUsersHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get users according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamUserDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
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