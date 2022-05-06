import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { PaginateAdministrativeAreasLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/paginate/paginate-administrative-areas-level-2.query';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/paginate')
export class CommonPaginateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate administrative-areas-level-2' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}