import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';
import { CreateAdministrativeAreaLevel1Dto } from './../dto/create-administrative-area-level-1.dto';

// @apps
import { CreateAdministrativeAreasLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1')
export class CommonCreateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-1 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel1Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel1Dto] })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel1Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(payload, { timezone }));
    }
}