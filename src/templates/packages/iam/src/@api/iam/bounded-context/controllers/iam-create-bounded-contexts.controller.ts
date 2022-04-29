/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';

// @apps
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/create')
export class IamCreateBoundedContextsController
{
    constructor(
        private readonly handler: IamCreateBoundedContextsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-contexts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamBoundedContextDto]})
    @ApiBody({ type: [IamCreateBoundedContextDto]})
    async main(
        @Body() payload: IamCreateBoundedContextDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}