import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';

// @apps
import { GetAdministrativeAreasLevel1Query } from '../../../../@apps/common/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { DeleteAdministrativeAreasLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/delete/delete-administrative-areas-level-1.command';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1')
export class CommonDeleteAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-1 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AdministrativeAreaLevel1Dto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel1 = await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel1Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel1;
    }
}