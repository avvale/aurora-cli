/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, CurrentAccount, Permissions, Timezone } from '@aurora-ts/core';
import { IamUserMetaDto, IamUpdateUserMetaByIdDto } from '../dto';

// @app
import { AccountResponse } from '@app/iam/account/domain/account.response';
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-meta/update')
@Permissions('iam.user-meta.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateUserMetaByIdController
{
    constructor(
        private readonly handler: IamUpdateUserMetaByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamUserMetaDto })
    async main(
        @Body() payload: IamUpdateUserMetaByIdDto,
        @CurrentAccount() account: AccountResponse,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            account,
            timezone,
        );
    }
}