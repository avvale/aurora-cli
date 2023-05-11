/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/find')
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextController
{
    constructor(
        private readonly handler: IamFindBoundedContextHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find bounded-context according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamBoundedContextDto })
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