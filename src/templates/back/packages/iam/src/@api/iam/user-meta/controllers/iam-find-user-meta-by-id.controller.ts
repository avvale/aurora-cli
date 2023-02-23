/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamUserMetaDto } from '../dto';

// @app
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-data/find')
@Permissions('iam.userData.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindUserMetaByIdController
{
    constructor(
        private readonly handler: IamFindUserMetaByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user data by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamUserMetaDto })
    async main(
        @Param('id') id: string,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            timezone,
        );
    }
}