import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { GetAdministrativeAreasLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { DeleteAdministrativeAreasLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/delete/delete-administrative-areas-level-2.command';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2')
export class CommonDeleteAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-2 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AdministrativeAreaLevel2Dto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel2 = await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel2Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel2;
    }
}