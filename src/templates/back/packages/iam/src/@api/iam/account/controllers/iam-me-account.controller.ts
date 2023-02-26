/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, HttpCode, Headers, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auth } from '@aurora/decorators';
import { IamAccountDto } from '../dto';

// @app
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/me')
@Auth()
export class IamMeAccountController
{
    constructor(
        private readonly handler: IamMeAccountHandler,
    ) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account according to header authorization jwt' })
    @ApiOkResponse({ description: 'The account is returned.', type: IamAccountDto })
    async main(
        @Headers('Authorization') authorization: string,
    )
    {
        return await this.handler.main(
            authorization,
        );
    }
}