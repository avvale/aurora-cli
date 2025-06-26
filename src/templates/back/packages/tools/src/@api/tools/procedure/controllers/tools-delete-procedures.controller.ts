/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsDeleteProceduresHandler, ToolsProcedureDto } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedures/delete')
@Auth('tools.procedure.delete')
export class ToolsDeleteProceduresController
{
    constructor(
        private readonly handler: ToolsDeleteProceduresHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete procedures in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ToolsProcedureDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
