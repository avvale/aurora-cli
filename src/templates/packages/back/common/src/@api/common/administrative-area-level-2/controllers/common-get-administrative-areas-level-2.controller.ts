import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { GetAdministrativeAreasLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2')
export class CommonGetAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find administrative-areas-level-2 according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AdministrativeAreaLevel2Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}