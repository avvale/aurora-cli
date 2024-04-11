/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageOutboxDto, MessageUpdateOutboxByIdDto, MessageUpsertOutboxHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outbox/upsert')
@Auth('message.outbox.upsert')
export class MessageUpsertOutboxController
{
    constructor(
        private readonly handler: MessageUpsertOutboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert outbox' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: MessageOutboxDto })
    async main(
        @Body() payload: MessageUpdateOutboxByIdDto,
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
