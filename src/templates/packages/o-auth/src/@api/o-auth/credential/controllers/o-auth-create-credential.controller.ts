/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { OAuthCreateCredentialDto } from '../dto';

// @apps
import { OAuthCreateCredentialHandler } from '../handlers/o-auth-create-credential.handler';

@ApiTags('[o-auth] credential')
@Controller('o-auth/credential')
export class OAuthCreateCredentialController
{
    constructor(
        private readonly handler: OAuthCreateCredentialHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create credential' })
    @ApiCreatedResponse({ description: 'The credential obtained after login.', type: OAuthCreateCredentialDto })
    async main(
        @Body() payload: OAuthCreateCredentialDto,
        @Headers('Authorization') authorization: string,
    )
    {
        return await this.handler.main(
            payload,
            authorization,
        );
    }
}