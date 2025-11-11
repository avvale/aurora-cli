/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsRunScriptsMigrationHandler } from '../handlers/tools-run-scripts-migration.handler';

@ApiTags('[tools] migration')
@Controller('tools/migration/run-scripts')
@Auth('tools.migration.update')
export class ToolsRunScriptsMigrationController {
    constructor(private readonly handler: ToolsRunScriptsMigrationHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(@Timezone() timezone?: string) {
        return await this.handler.main(timezone);
    }
}
