/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CurrentAccount, Timezone } from 'aurora-ts-core';
import { IamUserDataDto, IamUpdateUserDataByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { AccountResponse } from '@apps/iam/account/domain/account.response';
import { IamUpdateUserDataByIdHandler } from '../handlers/iam-update-user-data-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-data/update')
@Permissions('iam.user-data.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserDataByIdController
{
    constructor(
        private readonly handler: IamUpdateUserDataByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamUserDataDto })
    async main(
        @Body() payload: IamUpdateUserDataByIdDto,
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