/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/update')
@Permissions('iam.account.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateAccountByIdController
{
    constructor(
        private readonly handler: IamUpdateAccountByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update account by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamAccountDto })
    async main(
        @Body() payload: IamUpdateAccountByIdDto,
        @Body('constraint') constraint?: QueryStatement,
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