/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto, CommonUpdateLangByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpsertLangHandler } from '../handlers/common-upsert-lang.handler';

@ApiTags('[common] lang')
@Controller('common/lang/upsert')
@Auth('common.lang.upsert')
export class CommonUpsertLangController
{
    constructor(
        private readonly handler: CommonUpsertLangHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert lang' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: CommonLangDto })
    async main(
        @Body() payload: CommonUpdateLangByIdDto,
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