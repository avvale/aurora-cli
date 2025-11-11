/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsMigrationDto,
    ToolsUpdateMigrationByIdDto,
    ToolsUpdateMigrationByIdHandler,
} from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] migration')
@Controller('tools/migration/update')
@Auth('tools.migration.update')
export class ToolsUpdateMigrationByIdController {
    constructor(private readonly handler: ToolsUpdateMigrationByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update migration by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: ToolsMigrationDto,
    })
    async main(
        @Body() payload: ToolsUpdateMigrationByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, constraint, timezone);
    }
}
