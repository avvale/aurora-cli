/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamBoundedContextDto, IamUpdateBoundedContextDto } from '../dto';

// @apps
import { IamUpdateBoundedContextHandler } from '../handlers/iam-update-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/update')
export class IamUpdateBoundedContextController
{
    constructor(
        private readonly handler: IamUpdateBoundedContextHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-context' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamBoundedContextDto})
    async main(
        @Body() payload: IamUpdateBoundedContextDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}