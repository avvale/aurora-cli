/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamRoleDto } from '../dto';

// @apps
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/find')
export class IamFindRoleByIdController
{
    constructor(
        private readonly handler: IamFindRoleByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamRoleDto })
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