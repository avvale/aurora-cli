import { Pagination } from '@api/graphql';
import { ToolsPaginateProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.procedure.get')
export class ToolsPaginateProceduresResolver
{
    constructor(
        private readonly handler: ToolsPaginateProceduresHandler,
    ) {}

    @Query('toolsPaginateProcedures')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
