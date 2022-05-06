import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateAdministrativeAreaLevel3Dto } from './../dto/create-administrative-area-level-3.dto';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';

// @apps
import { FindAdministrativeAreaLevel3ByIdQuery } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { CreateAdministrativeAreaLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/create/create-administrative-area-level-3.command';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3')
export class CommonCreateAdministrativeAreaLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-3' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel3Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel3Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, {}, { timezone }));
    }
}