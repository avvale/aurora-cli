import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';
import { IamUser } from '../../../../graphql';

@Resolver()
export class IamFindUserByIdResolver
{
    constructor(
        private readonly handler: IamFindUserByIdHandler,
    ) {}

    @Query('iamFindUserById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}