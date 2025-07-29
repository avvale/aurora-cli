/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsCreateMigrationDto, ToolsCreateMigrationHandler, ToolsMigrationDto } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migration/create')
@Auth('tools.migration.create')
export class ToolsCreateMigrationController
{
    constructor(
        private readonly handler: ToolsCreateMigrationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create migration' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ToolsMigrationDto })
    async main(
        @Body() payload: ToolsCreateMigrationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
