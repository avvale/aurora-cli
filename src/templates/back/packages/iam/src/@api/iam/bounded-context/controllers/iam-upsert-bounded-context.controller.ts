/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/upsert')
@Auth('iam.boundedContext.upsert')
export class IamUpsertBoundedContextController
{
    constructor(
        private readonly handler: IamUpsertBoundedContextHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamUpdateBoundedContextByIdDto,
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