/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsDownScriptMigrationHandler } from '../handlers/tools-down-script-migration.handler';

@ApiTags('[tools] migration')
@Controller('tools/migration/down-script')
@Auth('tools.migration.update')
export class ToolsDownScriptMigrationController {
    constructor(private readonly handler: ToolsDownScriptMigrationHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(@Body() migrationId: string, @Timezone() timezone?: string) {
        return await this.handler.main(migrationId, timezone);
    }
}
