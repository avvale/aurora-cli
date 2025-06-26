/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsDownScriptProcedureHandler } from '../handlers/tools-down-script-procedure.handler';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/down-script')
@Auth('tools.procedure.execution')
export class ToolsDownScriptProcedureController
{
    constructor(
        private readonly handler: ToolsDownScriptProcedureHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() procedureId: string,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            procedureId,
            timezone,
        );
    }
}