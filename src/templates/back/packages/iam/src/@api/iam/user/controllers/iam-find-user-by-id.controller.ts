/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamUserDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Auth('iam.user.get')
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