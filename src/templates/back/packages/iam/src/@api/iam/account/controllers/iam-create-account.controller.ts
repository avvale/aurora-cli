/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Headers, LiteralObject, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/create')
@Permissions('iam.account.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateAccountController
{
    constructor(
        private readonly handler: IamCreateAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create account' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamAccountDto })
    async main(
        @Body() payload: IamCreateAccountDto,
        @Headers() headers: LiteralObject,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            headers,
            timezone,
            auditing,
        );
    }
}