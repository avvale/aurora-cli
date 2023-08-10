/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IamUpdateUserMetaByIdDto, IamUserMetaDto } from '../dto';
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-meta/update')
@Auth('iam.user-meta.update')
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
        @CurrentAccount() account: IamAccountResponse,
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