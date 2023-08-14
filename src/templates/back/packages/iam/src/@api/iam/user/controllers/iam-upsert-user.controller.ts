/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamUpdateUserByIdDto, IamUpsertUserHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/user/upsert')
@Auth('iam.user.upsert')
export class IamUpsertUserController
{
    constructor(
        private readonly handler: IamUpsertUserHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert user' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamUserDto })
    async main(
        @Body() payload: IamUpdateUserByIdDto,
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
