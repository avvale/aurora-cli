/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsUpScriptProcedureHandler } from '../handlers/tools-up-script-procedure.handler';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/up-script')
@Auth('tools.procedure.execution')
export class ToolsUpScriptProcedureController {
    constructor(private readonly handler: ToolsUpScriptProcedureHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(@Body() procedureId: string, @Timezone() timezone?: string) {
        return await this.handler.main(procedureId, timezone);
    }
}
