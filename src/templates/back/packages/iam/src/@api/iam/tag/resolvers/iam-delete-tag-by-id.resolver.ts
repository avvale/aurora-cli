import { IamTag } from '@api/graphql';
import { IamDeleteTagByIdHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.delete')
export class IamDeleteTagByIdResolver {
    constructor(private readonly handler: IamDeleteTagByIdHandler) {}

    @Mutation('iamDeleteTagById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTag> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
