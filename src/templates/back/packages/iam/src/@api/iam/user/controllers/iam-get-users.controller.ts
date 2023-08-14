/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetUsersHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/users/get')
@Auth('iam.user.get')
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
