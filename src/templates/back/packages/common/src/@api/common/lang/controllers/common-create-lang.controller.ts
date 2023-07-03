/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCreateLangDto, CommonCreateLangHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/create')
@Auth('common.lang.create')
export class CommonCreateLangController
{
    constructor(
        private readonly handler: CommonCreateLangHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create lang' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonLangDto })
    async main(
        @Body() payload: CommonCreateLangDto,
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