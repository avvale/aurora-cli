/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreaLevel2ByIdDto, CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/update')
@Auth('common.administrativeAreaLevel2.update')
export class CommonUpdateAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel2ByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}