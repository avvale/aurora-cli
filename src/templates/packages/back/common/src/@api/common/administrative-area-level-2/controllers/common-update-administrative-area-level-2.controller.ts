import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateAdministrativeAreaLevel2Dto } from './../dto/update-administrative-area-level-2.dto';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { UpdateAdministrativeAreaLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/update/update-administrative-area-level-2.command';
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2')
export class CommonUpdateAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-2' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AdministrativeAreaLevel2Dto})
    async main(
        @Body() payload: UpdateAdministrativeAreaLevel2Dto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel2Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, { timezone }));
    }
}