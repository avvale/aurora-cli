/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappPayload } from '@app/whatsapp';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WhatsappDigestWebhooksHandler } from '../handlers/whatsapp-digest-webhooks.handler';
import { WhatsappVerificationWebhooksHandler } from '../handlers/whatsapp-verification-webhooks.handler';

@ApiTags('[whatsapp] webhook')
@Controller('whatsapp/webhooks')
export class WhatsappWebhooksController {
  constructor(
    private readonly digestHandler: WhatsappDigestWebhooksHandler,
    private readonly verificationHandler: WhatsappVerificationWebhooksHandler,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: Boolean,
  })
  async digest(
    @Headers('x-hub-signature-256') xHubSignature256: string,
    @Body() payload: WhatsappPayload,
  ) {
    return await this.digestHandler.main(xHubSignature256, payload);
  }

  @Get()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: Number,
  })
  async verification(
    @Query('hub.mode') hubMode,
    @Query('hub.challenge') hubChallenge,
    @Query('hub.verify_token') hubVerifyToken,
  ) {
    return await this.verificationHandler.main(
      hubMode,
      hubChallenge,
      hubVerifyToken,
    );
  }
}
