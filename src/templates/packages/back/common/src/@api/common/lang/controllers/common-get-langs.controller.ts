import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { LangDto } from './../dto/lang.dto';

// @apps
import { GetLangsQuery } from '../../../../@apps/common/lang/application/get/get-langs.query';

@ApiTags('[common] lang')
@Controller('common/langs')
export class CommonGetLangsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find langs according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [LangDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));
    }
}