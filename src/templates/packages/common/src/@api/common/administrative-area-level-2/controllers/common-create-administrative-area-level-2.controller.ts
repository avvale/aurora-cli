import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateAdministrativeAreaLevel2Dto } from './../dto/create-administrative-area-level-2.dto';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { CreateAdministrativeAreaLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/create/create-administrative-area-level-2.command';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2')
export class CommonCreateAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-2' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel2Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel2Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, {}, { timezone }));
    }
}