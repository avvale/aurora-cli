/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsCreateMigrationDto, ToolsCreateMigrationsHandler, ToolsMigrationDto } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migrations/create')
@Auth('tools.migration.create')
export class ToolsCreateMigrationsController
{
    constructor(
        private readonly handler: ToolsCreateMigrationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create migrations in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ToolsMigrationDto]})
    @ApiBody({ type: [ToolsCreateMigrationDto]})
    async main(
        @Body() payload: ToolsCreateMigrationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
