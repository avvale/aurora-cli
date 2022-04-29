import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateAdministrativeAreaLevel1Dto } from './../dto/update-administrative-area-level-1.dto';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';

// @apps
import { UpdateAdministrativeAreaLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/update/update-administrative-area-level-1.command';
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1')
export class CommonUpdateAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-1' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AdministrativeAreaLevel1Dto})
    async main(
        @Body() payload: UpdateAdministrativeAreaLevel1Dto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel1Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, { timezone }));
    }
}