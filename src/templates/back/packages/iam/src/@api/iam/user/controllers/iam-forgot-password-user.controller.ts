/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auditing, AuditingMeta } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IamForgotPasswordUserDto } from '../dto';
import { IamForgotPasswordUserHandler } from '../handlers/iam-forgot-password-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/forgot-password')
export class IamForgotPasswordUserController
{
    constructor(
        private readonly handler: IamForgotPasswordUserHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() payload: IamForgotPasswordUserDto,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            auditing,
        );
    }
}