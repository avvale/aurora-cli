import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindLangByIdQuery } from '../../../../@apps/common/lang/application/find/find-lang-by-id.query';
import { UpdateLangCommand } from '../../../../@apps/common/lang/application/update/update-lang.command';
import { CommonUpdateLangInput } from './../../../../graphql';

@Resolver()
export class CommonUpdateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonUpdateLang')
    async main(
        @Args('payload') payload: CommonUpdateLangInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint, { timezone }));
    }
}