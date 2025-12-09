import { SupportIssue } from '@api/graphql';
import { SupportDeleteIssueByIdHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.delete')
export class SupportDeleteIssueByIdResolver {
    constructor(private readonly handler: SupportDeleteIssueByIdHandler) {}

    @Mutation('supportDeleteIssueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<SupportIssue> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
