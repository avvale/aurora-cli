/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/update')
@Permissions('iam.account.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}