/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageCreateOutboxDto,
    MessageCreateOutboxesHandler,
    MessageOutboxDto,
} from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] outbox')
@Controller('message/outboxes/create')
@Auth('message.outbox.create')
export class MessageCreateOutboxesController {
    constructor(private readonly handler: MessageCreateOutboxesHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create outboxes in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [MessageOutboxDto],
    })
    @ApiBody({ type: [MessageCreateOutboxDto] })
    async main(
        @Body() payload: MessageCreateOutboxDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
