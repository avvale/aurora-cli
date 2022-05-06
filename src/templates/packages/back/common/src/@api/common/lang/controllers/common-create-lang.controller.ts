import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateLangDto } from './../dto/create-lang.dto';
import { LangDto } from './../dto/lang.dto';

// @apps
import { FindLangByIdQuery } from '../../../../@apps/common/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '../../../../@apps/common/lang/application/create/create-lang.command';

@ApiTags('[common] lang')
@Controller('common/lang')
export class CommonCreateLangController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create lang' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: LangDto })
    async main(
        @Body() payload: CreateLangDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, {}, { timezone }));
    }
}