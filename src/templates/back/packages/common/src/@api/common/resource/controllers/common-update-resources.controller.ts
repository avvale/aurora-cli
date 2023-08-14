/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonResourceDto, CommonUpdateResourcesDto, CommonUpdateResourcesHandler } from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resources/update')
@Auth('common.resource.update')
export class CommonUpdateResourcesController
{
    constructor(
        private readonly handler: CommonUpdateResourcesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update resources' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonResourceDto })
    async main(
        @Body() payload: CommonUpdateResourcesDto,
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
