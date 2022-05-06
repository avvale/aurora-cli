import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from '../../../../@apps/common/administrative-area-level-1/application/delete/delete-administrative-area-level-1-by-id.command';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1')
export class CommonDeleteAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AdministrativeAreaLevel1Dto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel1 = await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel1ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel1;
    }
}