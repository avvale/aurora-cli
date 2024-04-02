/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamCreateTagDto, IamCreateTagsHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tags/create')
@Auth('iam.tag.create')
export class IamCreateTagsController
{
    constructor(
        private readonly handler: IamCreateTagsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tags in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamTagDto]})
    @ApiBody({ type: [IamCreateTagDto]})
    async main(
        @Body() payload: IamCreateTagDto[],
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
