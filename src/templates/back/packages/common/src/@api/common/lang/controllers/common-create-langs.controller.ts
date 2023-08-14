/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCreateLangDto, CommonCreateLangsHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/langs/create')
@Auth('common.lang.create')
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
