/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/upsert')
@Permissions('iam.user.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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