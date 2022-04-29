import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { FindAdministrativeAreaLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2.query';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2')
export class CommonFindAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find administrative-area-level-2 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel2Dto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel2Query(queryStatement, constraint, { timezone }));
    }
}