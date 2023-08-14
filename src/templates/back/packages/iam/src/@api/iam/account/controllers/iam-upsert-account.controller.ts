/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamUpdateAccountByIdDto, IamUpsertAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
