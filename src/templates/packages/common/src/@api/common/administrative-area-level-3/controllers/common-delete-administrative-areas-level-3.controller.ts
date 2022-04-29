import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';

// @apps
import { GetAdministrativeAreasLevel3Query } from '../../../../@apps/common/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { DeleteAdministrativeAreasLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/delete/delete-administrative-areas-level-3.command';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3')
export class CommonDeleteAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-3 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AdministrativeAreaLevel3Dto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel3 = await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel3Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel3;
    }
}