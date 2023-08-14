/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonGetResourcesHandler, CommonResourceDto } from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resources/get')
@Auth('common.resource.get')
export class CommonGetResourcesController
{
    constructor(
        private readonly handler: CommonGetResourcesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get resources according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonResourceDto]})
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
