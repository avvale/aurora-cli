/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonLangDto, CommonCreateLangDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';

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