import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { LangDto } from './../dto/lang.dto';
import { CreateLangDto } from './../dto/create-lang.dto';

// @apps
import { CreateLangsCommand } from '../../../../@apps/common/lang/application/create/create-langs.command';

@ApiTags('[common] lang')
@Controller('common/langs')
export class CommonCreateLangsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [LangDto] })
    @ApiBody({ type: [CreateLangDto] })
    async main(
        @Body() payload: CreateLangDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
    }
}