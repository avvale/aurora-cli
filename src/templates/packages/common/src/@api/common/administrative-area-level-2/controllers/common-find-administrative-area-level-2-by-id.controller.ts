import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2')
export class CommonFindAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel2Dto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));
    }
}