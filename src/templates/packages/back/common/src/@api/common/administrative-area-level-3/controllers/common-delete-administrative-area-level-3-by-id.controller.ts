import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';

// @apps
import { FindAdministrativeAreaLevel3ByIdQuery } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { DeleteAdministrativeAreaLevel3ByIdCommand } from '../../../../@apps/common/administrative-area-level-3/application/delete/delete-administrative-area-level-3-by-id.command';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3')
export class CommonDeleteAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AdministrativeAreaLevel3Dto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel3 = await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel3ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel3;
    }
}