/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindTagByIdHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tag/find')
@Auth('iam.tag.get')
export class IamFindTagByIdController {
    constructor(private readonly handler: IamFindTagByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tag by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: IamTagDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
