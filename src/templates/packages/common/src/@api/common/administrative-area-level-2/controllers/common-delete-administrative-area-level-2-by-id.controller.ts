import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from '../../../../@apps/common/administrative-area-level-2/application/delete/delete-administrative-area-level-2-by-id.command';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2')
export class CommonDeleteAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AdministrativeAreaLevel2Dto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel2ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel2;
    }
}