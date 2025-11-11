/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsFindProcedureByIdHandler,
    ToolsProcedureDto,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/find')
@Auth('tools.procedure.get')
export class ToolsFindProcedureByIdController {
    constructor(private readonly handler: ToolsFindProcedureByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find procedure by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: ToolsProcedureDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
