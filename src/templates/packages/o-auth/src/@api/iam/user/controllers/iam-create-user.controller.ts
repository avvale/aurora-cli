/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamUserDto, IamCreateUserDto } from '../dto';

// @apps
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/create')
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