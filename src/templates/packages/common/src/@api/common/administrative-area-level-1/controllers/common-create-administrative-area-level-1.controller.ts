import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateAdministrativeAreaLevel1Dto } from './../dto/create-administrative-area-level-1.dto';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { CreateAdministrativeAreaLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/create/create-administrative-area-level-1.command';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1')
export class CommonCreateAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-1' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel1Dto })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel1Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel1Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, {}, { timezone }));
    }
}