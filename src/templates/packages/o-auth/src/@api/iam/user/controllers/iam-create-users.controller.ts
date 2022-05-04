/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamUserDto, IamCreateUserDto } from '../dto';

// @apps
import { IamCreateUsersHandler } from '../handlers/iam-create-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/create')
export class IamCreateUsersController
{
    constructor(
        private readonly handler: IamCreateUsersHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create users in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamUserDto]})
    @ApiBody({ type: [IamCreateUserDto]})
    async main(
        @Body() payload: IamCreateUserDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}