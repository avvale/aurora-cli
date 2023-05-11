/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonLangDto, CommonCreateLangDto } from '../dto';

// @app
import { CommonCreateLangsHandler } from '../handlers/common-create-langs.handler';

@ApiTags('[common] lang')
@Controller('common/langs/create')
export class CommonCreateLangsController
{
    constructor(
        private readonly handler: CommonCreateLangsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonLangDto]})
    @ApiBody({ type: [CommonCreateLangDto]})
    async main(
        @Body() payload: CommonCreateLangDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}