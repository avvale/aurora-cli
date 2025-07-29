/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsUpScriptMigrationHandler } from '../handlers/tools-up-script-migration.handler';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migration/up-script')
@Auth('tools.migration.update')
export class ToolsUpScriptMigrationController
{
    constructor(
        private readonly handler: ToolsUpScriptMigrationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() migrationId: string,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            migrationId,
            timezone,
        );
    }
}