/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/upsert')
@Permissions('iam.account.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertAccountController
{
    constructor(
        private readonly handler: IamUpsertAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert account' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamAccountDto })
    async main(
        @Body() payload: IamUpdateAccountByIdDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}