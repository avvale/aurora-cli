/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamCreateTagDto, IamCreateTagHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tag/create')
@Auth('iam.tag.create')
export class IamCreateTagController {
    constructor(private readonly handler: IamCreateTagHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create tag' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: IamTagDto,
    })
    async main(
        @Body() payload: IamCreateTagDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
