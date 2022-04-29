import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';
import { CreateAdministrativeAreaLevel3Dto } from './../dto/create-administrative-area-level-3.dto';

// @apps
import { CreateAdministrativeAreasLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3')
export class CommonCreateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-3 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel3Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel3Dto] })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel3Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(payload, { timezone }));
    }
}