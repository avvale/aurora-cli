/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto, IamUpsertBoundedContextHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
