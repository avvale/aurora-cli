/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/upsert')
@Auth('iam.account.upsert')
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