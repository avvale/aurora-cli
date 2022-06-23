/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CommonLangDto, CommonCreateLangDto } from '../dto';

// @apps
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';

@ApiTags('[common] lang')
@Controller('common/lang/create')
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
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}