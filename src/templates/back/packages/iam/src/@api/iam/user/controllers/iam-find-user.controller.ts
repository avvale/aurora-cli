/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Auth('iam.user.get')
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