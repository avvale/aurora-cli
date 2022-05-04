/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto } from '../dto';

// @apps
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user/find')
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