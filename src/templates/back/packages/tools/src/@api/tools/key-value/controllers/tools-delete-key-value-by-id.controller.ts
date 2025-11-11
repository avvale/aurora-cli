/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsDeleteKeyValueByIdHandler,
    ToolsKeyValueDto,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-value/delete')
@Auth('tools.keyValue.delete')
export class ToolsDeleteKeyValueByIdController {
    constructor(private readonly handler: ToolsDeleteKeyValueByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete key-value by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: ToolsKeyValueDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
