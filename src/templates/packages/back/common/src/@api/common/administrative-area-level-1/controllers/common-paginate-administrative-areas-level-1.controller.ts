import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';

// @apps
import { PaginateAdministrativeAreasLevel1Query } from '../../../../@apps/common/administrative-area-level-1/application/paginate/paginate-administrative-areas-level-1.query';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/paginate')
export class CommonPaginateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate administrative-areas-level-1' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));
    }
}