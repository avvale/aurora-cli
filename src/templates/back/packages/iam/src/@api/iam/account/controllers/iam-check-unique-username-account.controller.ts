/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { IamCheckUniqueUsernameAccountHandler } from '../handlers/iam-check-unique-username-account.handler';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/check-unique-username')
@UseGuards(AuthenticationJwtGuard)
export class IamCheckUniqueUsernameAccountController
{
    constructor(
        private readonly handler: IamCheckUniqueUsernameAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() username: string,
        @Body() avoidUsernames: string[],
    )
    {
        return await this.handler.main(
            username,
            avoidUsernames,
        );
    }
}