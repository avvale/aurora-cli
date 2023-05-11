/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindBoundedContextByIdHandler } from '../handlers/iam-find-bounded-context-by-id.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/find')
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextByIdController
{
    constructor(
        private readonly handler: IamFindBoundedContextByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamBoundedContextDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}