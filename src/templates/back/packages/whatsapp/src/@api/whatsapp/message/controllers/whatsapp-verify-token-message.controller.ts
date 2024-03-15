/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { WhatsappVerifyTokenHandler } from '../handlers/whatsapp-verify-token.handler';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/inbox')
export class WhatsappVerifyTokenController
{
    constructor(
        private readonly handler: WhatsappVerifyTokenHandler,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Verify token' })
    @ApiCreatedResponse({ description: 'The token has been verified.', type: String })
    async main(
        @Query('hub.verify_token') verifyToken: string,
        @Query('hub.challenge') challenge: string,
    )
    {
        return await this.handler.main(
            verifyToken,
            challenge,
        );
    }
}