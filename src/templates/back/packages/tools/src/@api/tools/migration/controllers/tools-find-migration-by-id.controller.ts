/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsFindMigrationByIdHandler,
    ToolsMigrationDto,
} from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migration/find')
@Auth('tools.migration.get')
export class ToolsFindMigrationByIdController {
    constructor(private readonly handler: ToolsFindMigrationByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find migration by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: ToolsMigrationDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
