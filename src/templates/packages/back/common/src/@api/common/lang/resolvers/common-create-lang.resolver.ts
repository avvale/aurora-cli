import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindLangByIdQuery } from '../../../../@apps/common/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '../../../../@apps/common/lang/application/create/create-lang.command';
import { CommonCreateLangInput } from './../../../../graphql';

@Resolver()
export class CommonCreateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateLang')
    async main(
        @Args('payload') payload: CommonCreateLangInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, {}, { timezone }));
    }
}