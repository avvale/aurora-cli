/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';

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