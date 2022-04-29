import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateLangsCommand } from '../../../../@apps/common/lang/application/create/create-langs.command';
import { CommonCreateLangInput } from './../../../../graphql';

@Resolver()
export class CommonCreateLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateLangs')
    async main(
        @Args('payload') payload: CommonCreateLangInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
        return true;
    }
}