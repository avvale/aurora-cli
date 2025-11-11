/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteTagByIdHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tag/delete')
@Auth('iam.tag.delete')
export class IamDeleteTagByIdController {
    constructor(private readonly handler: IamDeleteTagByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tag by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamTagDto,
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
