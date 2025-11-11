/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsGetProceduresHandler,
    ToolsProcedureDto,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedures/get')
@Auth('tools.procedure.get')
export class ToolsGetProceduresController {
    constructor(private readonly handler: ToolsGetProceduresHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get procedures according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [ToolsProcedureDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
