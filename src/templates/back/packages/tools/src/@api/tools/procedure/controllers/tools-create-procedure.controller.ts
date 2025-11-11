/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsCreateProcedureDto,
    ToolsCreateProcedureHandler,
    ToolsProcedureDto,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/create')
@Auth('tools.procedure.create')
export class ToolsCreateProcedureController {
    constructor(private readonly handler: ToolsCreateProcedureHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create procedure' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ToolsProcedureDto,
    })
    async main(
        @Body() payload: ToolsCreateProcedureDto,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, timezone);
    }
}
