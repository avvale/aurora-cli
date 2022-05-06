import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { LangDto } from './../dto/lang.dto';

// @apps
import { FindLangByIdQuery } from '../../../../@apps/common/lang/application/find/find-lang-by-id.query';
import { DeleteLangByIdCommand } from '../../../../@apps/common/lang/application/delete/delete-lang-by-id.command';

@ApiTags('[common] lang')
@Controller('common/lang')
export class CommonDeleteLangByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete lang by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: LangDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteLangByIdCommand(id, constraint, { timezone }));

        return lang;
    }
}