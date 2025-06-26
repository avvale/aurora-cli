/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsKeyValueDto, ToolsUpdateKeyValuesDto, ToolsUpdateKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-values/update')
@Auth('tools.keyValue.update')
export class ToolsUpdateKeyValuesController
{
    constructor(
        private readonly handler: ToolsUpdateKeyValuesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update key-values' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ToolsKeyValueDto })
    async main(
        @Body() payload: ToolsUpdateKeyValuesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
