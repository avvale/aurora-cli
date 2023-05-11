/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/create')
@Auth('iam.boundedContext.create')
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