import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
import { CreateAdministrativeAreaLevel2Dto } from './../dto/create-administrative-area-level-2.dto';

// @apps
import { CreateAdministrativeAreasLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2')
export class CommonCreateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-2 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel2Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel2Dto] })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel2Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(payload, { timezone }));
    }
}