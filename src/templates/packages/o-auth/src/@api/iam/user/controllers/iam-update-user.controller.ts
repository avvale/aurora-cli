/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto, IamUpdateUserDto } from '../dto';

// @apps
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/update')
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