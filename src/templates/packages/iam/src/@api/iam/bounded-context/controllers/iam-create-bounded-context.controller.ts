/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';

// @apps
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/create')
export class IamCreateBoundedContextController
{
    constructor(
        private readonly handler: IamCreateBoundedContextHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamCreateBoundedContextDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}