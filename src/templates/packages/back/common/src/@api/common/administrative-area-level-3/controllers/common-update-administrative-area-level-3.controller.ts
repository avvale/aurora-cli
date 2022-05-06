import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateAdministrativeAreaLevel3Dto } from './../dto/update-administrative-area-level-3.dto';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';

// @apps
import { UpdateAdministrativeAreaLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/update/update-administrative-area-level-3.command';
import { FindAdministrativeAreaLevel3ByIdQuery } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3')
export class CommonUpdateAdministrativeAreaLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-3' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AdministrativeAreaLevel3Dto})
    async main(
        @Body() payload: UpdateAdministrativeAreaLevel3Dto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel3Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, { timezone }));
    }
}