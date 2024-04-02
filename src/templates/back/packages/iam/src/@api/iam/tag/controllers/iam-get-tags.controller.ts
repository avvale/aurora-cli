/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetTagsHandler, IamTagDto } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tags/get')
@Auth('iam.tag.get')
export class IamGetTagsController
{
    constructor(
        private readonly handler: IamGetTagsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get tags according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamTagDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
