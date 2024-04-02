/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamTagDto, IamUpdateTagsDto, IamUpdateTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tags/update')
@Auth('iam.tag.update')
export class IamUpdateTagsController
{
    constructor(
        private readonly handler: IamUpdateTagsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tags' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamTagDto })
    async main(
        @Body() payload: IamUpdateTagsDto,
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
