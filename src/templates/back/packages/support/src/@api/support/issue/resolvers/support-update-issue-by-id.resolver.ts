import { SupportIssue, SupportUpdateIssueByIdInput } from '@api/graphql';
import { SupportUpdateIssueByIdHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.update')
export class SupportUpdateIssueByIdResolver {
    constructor(private readonly handler: SupportUpdateIssueByIdHandler) {}

    @Mutation('supportUpdateIssueById')
    async main(
        @Args('payload') payload: SupportUpdateIssueByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<SupportIssue> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
