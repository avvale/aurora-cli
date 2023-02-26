/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/create')
@Auth('iam.boundedContext.create')
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