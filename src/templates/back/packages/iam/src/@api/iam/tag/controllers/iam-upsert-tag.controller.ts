/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamTagDto, IamUpdateTagByIdDto, IamUpsertTagHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tag/upsert')
@Auth('iam.tag.upsert')
export class IamUpsertTagController
{
    constructor(
        private readonly handler: IamUpsertTagHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert tag' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamTagDto })
    async main(
        @Body() payload: IamUpdateTagByIdDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
