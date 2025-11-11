/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auditing, AuditingMeta } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IamResetPasswordUserDto } from '../dto';
import { IamResetPasswordUserHandler } from '../handlers/iam-reset-password-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/reset-password')
export class IamResetPasswordUserController {
    constructor(private readonly handler: IamResetPasswordUserHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(
        @Body() payload: IamResetPasswordUserDto,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, auditing);
    }
}
